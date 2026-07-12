from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGBadge(models.Model):
    _name = "esg.badge"
    _description = "ESG Badge"
    _rec_name = "name"
    _order = "name"

    name = fields.Char(
        string="Badge Name",
        required=True,
    )

    description = fields.Text(
        string="Description",
    )

    points = fields.Integer(
        string="Points",
        default=0,
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "badge_name_unique",
            "unique(name)",
            "Badge name already exists.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError(
                    "Badge name cannot be empty."
                )
