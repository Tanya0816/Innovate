from datetime import date

from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGCSRActivity(models.Model):
    _name = "esg.csr.activity"
    _description = "CSR Activity"
    _rec_name = "title"
    _order = "activity_date desc"

    title = fields.Char(
        string="Activity Title",
        required=True,
    )

    category_id = fields.Many2one(
        "esg.category",
        string="Category",
        required=True,
        ondelete="restrict",
    )

    department_id = fields.Many2one(
        "esg.department",
        string="Department",
        required=True,
        ondelete="restrict",
    )

    activity_date = fields.Date(
        string="Activity Date",
        required=True,
    )

    location = fields.Char(
        string="Location",
    )

    description = fields.Text(
        string="Description",
    )

    points = fields.Integer(
        string="Reward Points",
        default=10,
        required=True,
    )

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("planned", "Planned"),
            ("ongoing", "Ongoing"),
            ("completed", "Completed"),
            ("cancelled", "Cancelled"),
        ],
        default="draft",
        required=True,
    )

    active = fields.Boolean(default=True)

    _sql_constraints = [
        (
            "csr_activity_unique",
            "unique(title, activity_date)",
            "CSR Activity already exists.",
        ),
    ]

    @api.constrains("title")
    def _check_title(self):
        for record in self:
            if not record.title.strip():
                raise ValidationError(
                    "Activity title cannot be empty."
                )

    @api.constrains("points")
    def _check_points(self):
        for record in self:
            if record.points < 0:
                raise ValidationError(
                    "Points cannot be negative."
                )

    @api.constrains("activity_date")
    def _check_date(self):
        for record in self:
            if (
                record.activity_date
                and record.status == "planned"
                and record.activity_date < date.today()
            ):
                raise ValidationError(
                    "Planned activity date cannot be in the past."
                )