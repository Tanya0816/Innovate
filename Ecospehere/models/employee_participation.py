from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGEmployeeParticipation(models.Model):
    _name = "esg.employee.participation"
    _description = "Employee Participation"
    _rec_name = "employee_id"
    _order = "completion_date desc"

    employee_id = fields.Many2one(
        "hr.employee",
        string="Employee",
        required=True,
        ondelete="cascade",
    )

    activity_id = fields.Many2one(
        "esg.csr.activity",
        string="CSR Activity",
        required=True,
        ondelete="cascade",
    )

    proof = fields.Binary(
        string="Proof",
    )

    proof_filename = fields.Char(
        string="Filename",
    )

    approval_status = fields.Selection(
        [
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
        ],
        default="pending",
        required=True,
    )

    points_earned = fields.Integer(
        string="Points Earned",
        default=0,
    )

    completion_date = fields.Date(
        string="Completion Date",
        default=fields.Date.today,
    )

    remarks = fields.Text()

    _sql_constraints = [
        (
            "employee_activity_unique",
            "unique(employee_id, activity_id)",
            "Employee has already participated in this CSR Activity.",
        ),
    ]

    @api.constrains("approval_status", "proof")
    def _check_proof(self):
        for record in self:
            if (
                record.approval_status == "approved"
                and not record.proof
            ):
                raise ValidationError(
                    "Proof is required before approval."
                )

    @api.constrains("points_earned")
    def _check_points(self):
        for record in self:
            if record.points_earned < 0:
                raise ValidationError(
                    "Points cannot be negative."
                )

    @api.onchange("approval_status")
    def _onchange_approval(self):
        if (
            self.approval_status == "approved"
            and self.activity_id
        ):
            self.points_earned = self.activity_id.points

        elif self.approval_status == "rejected":
            self.points_earned = 0