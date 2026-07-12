from odoo import fields, models


class ESGCategory(models.Model):
    _name = "esg.category"
    _description = "ESG Category"

    name = fields.Char(required=True)

    type = fields.Selection(
        [
            ("csr", "CSR Activity"),
            ("challenge", "Challenge"),
            ("policy", "Policy"),
        ],
        required=True,
    )

    active = fields.Boolean(default=True)

    _sql_constraints = [
        (
            "category_name_type_unique",
            "unique(name,type)",
            "Category already exists.",
        )
    ]
