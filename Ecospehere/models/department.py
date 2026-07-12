from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGDepartment(models.Model):
    _name = "esg.department"
    _description = "ESG Department"
    _rec_name = "name"
    _order = "name"

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
        ondelete="restrict",
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "department_name_unique",
            "unique(name)",
            "Department name already exists.",
        ),
        (
            "department_code_unique",
            "unique(code)",
            "Department code already exists.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name.strip():
                raise ValidationError("Department name cannot be empty.")

    @api.constrains("code")
    def _check_code(self):
        for record in self:
            if not record.code.strip():
                raise ValidationError("Department code cannot be empty.")

    @api.constrains("parent_department_id")
    def _check_parent(self):
        for record in self:
            if record.parent_department_id == record:
                raise ValidationError(
                    "A department cannot be its own parent."
                )
