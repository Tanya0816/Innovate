from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGReward(models.Model):
    _name = "esg.reward"
    _description = "ESG Reward"
    _rec_name = "name"
    _order = "name"

    name = fields.Char(
        string="Reward Name",
        required=True,
    )

    description = fields.Text(
        string="Description",
    )

    points_required = fields.Integer(
        string="Points Required",
        required=True,
    )

    stock = fields.Integer(
        string="Available Stock",
        required=True,
        default=0,
    )

    status = fields.Selection(
        [
            ("available", "Available"),
            ("out_of_stock", "Out of Stock"),
            ("inactive", "Inactive"),
        ],
        string="Status",
        default="available",
        required=True,
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "reward_name_unique",
            "unique(name)",
            "Reward name already exists.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError(
                    "Reward name cannot be empty."
                )

    @api.constrains("points_required")
    def _check_points(self):
        for record in self:
            if record.points_required < 0:
                raise ValidationError(
                    "Points Required cannot be negative."
                )

    @api.constrains("stock")
    def _check_stock(self):
        for record in self:
            if record.stock < 0:
                raise ValidationError(
                    "Stock cannot be negative."
                )