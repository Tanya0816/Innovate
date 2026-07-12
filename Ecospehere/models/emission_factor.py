from odoo import fields, models


class EmissionFactor(models.Model):
    _name = "esg.emission.factor"
    _description = "Emission Factor"

    name = fields.Char(required=True)

    source = fields.Selection(
        [
            ("purchase", "Purchase"),
            ("fleet", "Fleet"),
            ("expense", "Expense"),
            ("manufacturing", "Manufacturing"),
        ],
        required=True,
    )

    unit = fields.Char(required=True)

    factor = fields.Float(required=True)

    active = fields.Boolean(default=True)
