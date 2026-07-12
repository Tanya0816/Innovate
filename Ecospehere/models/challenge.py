from odoo import fields, models


class ESGChallenge(models.Model):
    _name = "esg.challenge"
    _description = "ESG Challenge"

    name = fields.Char(required=True)
    description = fields.Text()
    active = fields.Boolean(default=True)
