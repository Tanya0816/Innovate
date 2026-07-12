from odoo.tests.common import TransactionCase
from odoo.exceptions import ValidationError
from datetime import date, timedelta

class TestESGModels(TransactionCase):
    
    def setUp(self):
        super(TestESGModels, self).setUp()
        
        # Create a mock department for testing
        self.department = self.env['esg.department'].create({
            'name': 'IT Department',
        })
        
        # Create a mock audit for compliance issue tests
        self.audit = self.env['esg.audit'].create({
            'audit_name': 'Annual Security Audit',
            'audit_type': 'Security',
            'department_id': self.department.id,
            'status': 'Completed'
        })
        
        # Create a mock employee
        self.employee = self.env['hr.employee'].create({
            'name': 'John Doe',
        })

    def test_department_score_computation(self):
        """Test if the department score correctly calculates the weighted total score."""
        score_record = self.env['esg.department.score'].create({
            'department_id': self.department.id,
            'environmental_score': 80.0,
            'social_score': 70.0,
            'governance_score': 90.0,
        })
        
        # Calculation: (80 * 0.40) + (70 * 0.30) + (90 * 0.30)
        # = 32 + 21 + 27 = 80.0
        self.assertEqual(score_record.total_score, 80.0, "Total Score computation failed.")

    def test_department_score_validation(self):
        """Test if validation prevents invalid scores."""
        with self.assertRaises(ValidationError):
            self.env['esg.department.score'].create({
                'department_id': self.department.id,
                'environmental_score': 150.0, # Invalid score
                'social_score': 70.0,
                'governance_score': 90.0,
            })

    def test_compliance_issue_overdue(self):
        """Test if compliance issue computes overdue status when past due date."""
        past_date = date.today() - timedelta(days=5)
        
        issue = self.env['esg.compliance.issue'].create({
            'title': 'Missing Security Patch',
            'audit_id': self.audit.id,
            'owner': self.employee.id,
            'due_date': past_date,
            'status': 'Open'
        })
        
        # Should be overdue because status is Open and due date is in the past
        self.assertTrue(issue.is_overdue, "Compliance Issue did not compute Overdue flag correctly.")
        
        # Closing it should remove the overdue flag
        issue.status = 'Closed'
        self.assertFalse(issue.is_overdue, "Closed issues should not be flagged as overdue.")

    def test_carbon_transaction_emission(self):
        """Test carbon emission multiplication logic."""
        factor = self.env['esg.emission.factor'].create({
            'name': 'Electricity Factor',
            'emission_factor': 0.5,
        })
        
        transaction = self.env['esg.carbon.transaction'].create({
            'source_type': 'expense',
            'department_id': self.department.id,
            'emission_factor_id': factor.id,
            'quantity': 1000,
        })
        
        # 1000 * 0.5 = 500
        self.assertEqual(transaction.emission, 500.0, "Carbon transaction emission computation failed.")
