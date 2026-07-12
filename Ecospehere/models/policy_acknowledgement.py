from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGPolicyAcknowledgement(models.Model):
    _name = "esg.policy.acknowledgement"
    _description = "Policy Acknowledgement"
    _rec_name = "employee_id"
    _order = "acknowledgement_date desc"

    employee_id = fields.Many2one(
        "hr.employee",
        string="Employee",
        required=True,
        ondelete="cascade",
    )

    policy_id = fields.Many2one(
        "esg.policy",
        string="Policy",
        required=True,
        ondelete="restrict",
    )

    acknowledgement_date = fields.Date(
        string="Acknowledgement Date",
        default=fields.Date.today,
        required=True,
    )

    status = fields.Selection(
        [
            ("pending", "Pending"),
            ("acknowledged", "Acknowledged"),
        ],
        default="pending",
        required=True,
    )

    remarks = fields.Text()

    _sql_constraints = [
        (
            "employee_policy_unique",
            "unique(employee_id, policy_id)",
            "Employee has already acknowledged this policy.",
        ),
    ]

    @api.constrains("policy_id")
    def _check_policy(self):
        for record in self:
            if record.policy_id.status != "active":
                raise ValidationError(
                    "Only active policies can be acknowledged."
                )