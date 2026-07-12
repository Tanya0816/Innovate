from odoo import fields, models


class ProductESGProfile(models.Model):
    _name = "esg.product.profile"
    _description = "Product ESG Profile"

    name = fields.Char(required=True)

    carbon_footprint = fields.Float()

    recyclable = fields.Boolean()

    renewable_percentage = fields.Float()

    supplier_rating = fields.Float()
