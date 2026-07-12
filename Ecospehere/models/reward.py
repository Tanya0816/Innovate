from odoo import fields, models


class ESGReward(models.Model):
    _name = "esg.reward"
    _description = "ESG Reward"

    name = fields.Char(required=True)
    description = fields.Text()
    points = fields.Integer(default=0)
    active = fields.Boolean(default=True)
