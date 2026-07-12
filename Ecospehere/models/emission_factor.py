from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGEmissionFactor(models.Model):
    _name = "esg.emission.factor"
    _description = "ESG Emission Factor"
    _rec_name = "name"
    _order = "source_type, name"

    name = fields.Char(
        string="Factor Name",
        required=True,
    )

    source_type = fields.Selection(
        [
            ("purchase", "Purchase"),
            ("manufacturing", "Manufacturing"),
            ("expense", "Expense"),
            ("fleet", "Fleet"),
        ],
        string="Source Type",
        required=True,
    )

    unit = fields.Char(
        string="Unit",
        required=True,
        help="Example: kg, litre, kWh, km",
    )

    emission_factor = fields.Float(
        string="Emission Factor",
        required=True,
        digits=(16, 4),
        help="CO2 emitted per unit",
    )

    description = fields.Text(
        string="Description",
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "factor_unique",
            "unique(name, source_type)",
            "This emission factor already exists.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError(
                    "Factor name cannot be empty."
                )

    @api.constrains("emission_factor")
    def _check_factor(self):
        for record in self:
            if record.emission_factor <= 0:
                raise ValidationError(
                    "Emission factor must be greater than zero."
                )
