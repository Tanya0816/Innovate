from odoo import fields, models


class EnvironmentalGoal(models.Model):
    _name = "esg.environment.goal"
    _description = "Environmental Goal"

    name = fields.Char(required=True)

    department_id = fields.Many2one(
        "hr.department",
        required=True,
    )

    target_value = fields.Float(required=True)

    current_value = fields.Float(default=0)

    start_date = fields.Date()

    end_date = fields.Date()

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("active", "Active"),
            ("completed", "Completed"),
        ],
        default="draft",
    )
