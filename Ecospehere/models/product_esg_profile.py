from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGProductProfile(models.Model):
    _name = "esg.product.profile"
    _description = "Product ESG Profile"
    _rec_name = "product_name"
    _order = "product_name"

    product_name = fields.Char(
        string="Product Name",
        required=True,
    )

    product_code = fields.Char(
        string="Product Code",
        required=True,
    )

    category_id = fields.Many2one(
        "esg.category",
        string="Category",
    )

    emission_factor_id = fields.Many2one(
        "esg.emission.factor",
        string="Emission Factor",
        required=True,
        ondelete="restrict",
    )

    recyclable = fields.Boolean(
        string="Recyclable",
        default=False,
    )

    active = fields.Boolean(
        default=True,
    )

    description = fields.Text(
        string="Description",
    )

    _sql_constraints = [
        (
            "product_code_unique",
            "unique(product_code)",
            "Product code already exists.",
        ),
    ]

    @api.constrains("product_name")
    def _check_product_name(self):
        for record in self:
            if not record.product_name or not record.product_name.strip():
                raise ValidationError(
                    "Product name cannot be empty."
                )

    @api.constrains("product_code")
    def _check_product_code(self):
        for record in self:
            if not record.product_code or not record.product_code.strip():
                raise ValidationError(
                    "Product code cannot be empty."
                )
