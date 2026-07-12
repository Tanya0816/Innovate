from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGEnvironmentGoal(models.Model):
    _name = "esg.environment.goal"
    _description = "Environmental Goal"
    _rec_name = "name"
    _order = "end_date"

    name = fields.Char(
        string="Goal Name",
        required=True,
    )

    department_id = fields.Many2one(
        "esg.department",
        string="Department",
        required=True,
        ondelete="restrict",
    )

    target_value = fields.Float(
        string="Target Value",
        required=True,
    )

    unit = fields.Char(
        string="Unit",
        required=True,
        help="Example: kg CO2, ton CO2, kWh",
    )

    start_date = fields.Date(
        string="Start Date",
        required=True,
    )

    end_date = fields.Date(
        string="End Date",
        required=True,
    )

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("active", "Active"),
            ("completed", "Completed"),
            ("cancelled", "Cancelled"),
        ],
        default="draft",
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
            "goal_name_department_unique",
            "unique(name, department_id)",
            "This goal already exists for the department.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError(
                    "Goal name cannot be empty."
                )

    @api.constrains("target_value")
    def _check_target(self):
        for record in self:
            if record.target_value <= 0:
                raise ValidationError(
                    "Target value must be greater than zero."
                )

    @api.constrains("start_date", "end_date")
    def _check_dates(self):
        for record in self:
            if record.end_date < record.start_date:
                raise ValidationError(
                    "End Date cannot be before Start Date."
                )
