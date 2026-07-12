from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGRewardRedemption(models.Model):
    _name = "esg.reward.redemption"
    _description = "Reward Redemption"
    _rec_name = "employee_id"
    _order = "redemption_date desc"

    employee_id = fields.Many2one(
        "hr.employee",
        string="Employee",
        required=True,
        ondelete="cascade",
    )

    reward_id = fields.Many2one(
        "esg.reward",
        string="Reward",
        required=True,
        ondelete="restrict",
    )

    points_used = fields.Integer(
        string="Points Used",
        required=True,
        default=0,
    )

    redemption_date = fields.Date(
        string="Redemption Date",
        default=fields.Date.today,
        required=True,
    )

    status = fields.Selection(
        [
            ("pending", "Pending"),
            ("redeemed", "Redeemed"),
            ("cancelled", "Cancelled"),
        ],
        default="pending",
        required=True,
    )

    @api.onchange("reward_id")
    def _onchange_reward(self):
        if self.reward_id:
            self.points_used = self.reward_id.points_required

    @api.constrains("points_used")
    def _check_points_used(self):
        for record in self:
            if record.points_used < 0:
                raise ValidationError(
                    "Points Used cannot be negative."
                )

    @api.constrains("employee_id", "reward_id", "points_used")
    def _check_redemption_rules(self):
        for record in self:
            if not record.employee_id or not record.reward_id:
                continue

            if record.reward_id.stock <= 0:
                raise ValidationError(
                    "Reward stock is unavailable."
                )

            employee_points = self._get_employee_points(record.employee_id.id)
            if employee_points < record.points_used:
                raise ValidationError(
                    "Employee does not have enough points to redeem this reward."
                )

    def _get_employee_points(self, employee_id):
        csr_points = sum(
            self.env["esg.employee.participation"]
            .search(
                [
                    ("employee_id", "=", employee_id),
                    ("approval_status", "=", "approved"),
                ]
            )
            .mapped("points_earned")
        )

        challenge_points = sum(
            self.env["esg.challenge.participation"]
            .search(
                [
                    ("employee_id", "=", employee_id),
                    ("approval_status", "=", "approved"),
                ]
            )
            .mapped("points_earned")
        )

        return csr_points + challenge_points

    @api.model
    def create(self, vals):
        reward_id = vals.get("reward_id")
        if reward_id:
            reward = self.env["esg.reward"].browse(reward_id)
            if reward.stock <= 0:
                raise ValidationError(
                    "Reward stock is unavailable."
                )

            points_used = vals.get("points_used", reward.points_required)
            if points_used < reward.points_required:
                vals["points_used"] = reward.points_required

            employee_id = vals.get("employee_id")
            if employee_id:
                available_points = self._get_employee_points(employee_id)
                if available_points < vals["points_used"]:
                    raise ValidationError(
                        "Employee does not have enough points to redeem this reward."
                    )

            vals["status"] = "redeemed"
            reward.write({"stock": reward.stock - 1})

        return super().create(vals)