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
        default=0,
        required=True,
    )

    redemption_date = fields.Date(
        string="Redemption Date",
        default=fields.Date.today,
        required=True,
    )

    status = fields.Selection(
        [
            ("Pending", "Pending"),
            ("Redeemed", "Redeemed"),
            ("Cancelled", "Cancelled"),
        ],
        string="Status",
        default="Pending",
        required=True,
    )

    @api.constrains("points_used")
    def _check_points_used(self):
        for record in self:
            if record.points_used < 0:
                raise ValidationError("Points used cannot be negative.")

    def _get_available_points(self, employee_id):
        csr_points = sum(
            self.env["esg.employee.participation"].search([
                ("employee_id", "=", employee_id),
                ("approval_status", "=", "approved"),
            ]).mapped("points_earned")
        )

        challenge_points = sum(
            self.env["esg.challenge.participation"].search([
                ("employee_id", "=", employee_id),
                ("approval_status", "=", "Approved"),
            ]).mapped("points_earned")
        )

        redeemed_points = sum(
            self.search([
                ("employee_id", "=", employee_id),
                ("status", "=", "Redeemed"),
            ]).mapped("points_used")
        )

        return csr_points + challenge_points - redeemed_points

    @api.onchange("reward_id")
    def _onchange_reward(self):
        if self.reward_id:
            self.points_used = self.reward_id.points_required

    @api.model
    def create(self, vals):
        if not vals.get("reward_id"):
            raise ValidationError("Reward is required.")
        
        reward = self.env["esg.reward"].browse(vals["reward_id"])
        
        # Override points_used just to be safe
        vals["points_used"] = reward.points_required

        status = vals.get("status", "Pending")
        employee_id = vals.get("employee_id")

        if status == "Redeemed":
            if reward.stock <= 0:
                raise ValidationError("Reward stock cannot become negative.")
            available = self._get_available_points(employee_id)
            if available < vals["points_used"]:
                raise ValidationError("Employee points cannot become negative.")
            
            reward.stock -= 1

        return super().create(vals)

    def write(self, vals):
        for record in self:
            old_status = record.status
            new_status = vals.get("status", old_status)
            
            if old_status == "Redeemed" and new_status == "Cancelled":
                record.reward_id.stock += 1
            
            elif old_status != "Redeemed" and new_status == "Redeemed":
                reward = self.env["esg.reward"].browse(vals.get("reward_id", record.reward_id.id))
                points_used = vals.get("points_used", record.points_used)
                
                if reward.stock <= 0:
                    raise ValidationError("Reward stock cannot become negative.")
                
                available = self._get_available_points(vals.get("employee_id", record.employee_id.id))
                if available < points_used:
                    raise ValidationError("Employee points cannot become negative.")
                
                reward.stock -= 1
                
        return super().write(vals)
