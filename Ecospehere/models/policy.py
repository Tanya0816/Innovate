from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGPolicy(models.Model):
    _name = "esg.policy"
    _description = "ESG Policy"
    _rec_name = "title"
    _order = "title"

    title = fields.Char(
        string="Policy Title",
        required=True,
    )

    policy_code = fields.Char(
        string="Policy Code",
        required=True,
    )

    category = fields.Selection(
        [
            ("environment", "Environmental"),
            ("social", "Social"),
            ("governance", "Governance"),
        ],
        string="Category",
        required=True,
    )

    description = fields.Text(
        string="Description",
    )

    effective_date = fields.Date(
        string="Effective Date",
        required=True,
    )

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("active", "Active"),
            ("inactive", "Inactive"),
        ],
        default="draft",
        required=True,
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "policy_code_unique",
            "unique(policy_code)",
            "Policy code already exists.",
        ),
    ]

    @api.constrains("title")
    def _check_title(self):
        for record in self:
            if not record.title or not record.title.strip():
                raise ValidationError(
                    "Policy title cannot be empty."
                )

    @api.constrains("policy_code")
    def _check_code(self):
        for record in self:
            if not record.policy_code or not record.policy_code.strip():
                raise ValidationError(
                    "Policy code cannot be empty."
                )
