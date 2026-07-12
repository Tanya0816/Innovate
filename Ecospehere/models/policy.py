from odoo import fields, models


class ESGPolicy(models.Model):
    _name = "esg.policy"
    _description = "ESG Policy"

    name = fields.Char(required=True)
    description = fields.Text()
    active = fields.Boolean(default=True)
