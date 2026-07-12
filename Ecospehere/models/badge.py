from odoo import fields, models


class ESGBadge(models.Model):
    _name = "esg.badge"
    _description = "ESG Badge"

    name = fields.Char(required=True)
    description = fields.Text()
    points = fields.Integer(default=0)
    active = fields.Boolean(default=True)
