from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGCategory(models.Model):
    _name = "esg.category"
    _description = "ESG Category"
    _rec_name = "name"
    _order = "type, name"

    name = fields.Char(
        string="Category Name",
        required=True,
    )

    type = fields.Selection(
        [
            ("csr", "CSR Activity"),
            ("challenge", "Challenge"),
        ],
        string="Category Type",
        required=True,
    )

    description = fields.Text(
        string="Description",
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "category_name_type_unique",
            "unique(name, type)",
            "Category already exists for this type.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError(
                    "Category name cannot be empty."
                )
