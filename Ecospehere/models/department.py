from odoo import fields, models


class ESGDepartment(models.Model):
    _name = "esg.department"
    _description = "ESG Department"
    _rec_name = "name"

    name = fields.Char(
        string="Department Name",
        required=True,
    )

    code = fields.Char(
        string="Department Code",
        required=True,
    )

    head = fields.Char(
        string="Department Head",
    )

    parent_department_id = fields.Many2one(
        "esg.department",
        string="Parent Department",
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "department_code_unique",
            "unique(code)",
            "Department code already exists.",
        )
    ]
