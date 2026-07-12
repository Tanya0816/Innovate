from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGChallengeParticipation(models.Model):
    _name = "esg.challenge.participation"
    _description = "Challenge Participation"
    _rec_name = "employee_id"
    _order = "completion_date desc"

    employee_id = fields.Many2one(
        "hr.employee",
        string="Employee",
        required=True,
        ondelete="cascade",
    )

    challenge_id = fields.Many2one(
        "esg.challenge",
        string="Challenge",
        required=True,
        ondelete="cascade",
    )

    progress = fields.Selection(
        [
            ("started", "Started"),
            ("in_progress", "In Progress"),
            ("submitted", "Submitted"),
            ("approved", "Approved"),
            ("completed", "Completed"),
        ],
        string="Progress",
        default="started",
        required=True,
    )

    proof = fields.Binary(
        string="Proof",
    )

    proof_filename = fields.Char(
        string="Filename",
    )

    approval_status = fields.Selection(
        [
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected"),
        ],
        default="pending",
        required=True,
    )

    points_earned = fields.Integer(
        string="Points Earned",
        default=0,
    )

    completion_date = fields.Date(
        string="Completion Date",
        default=fields.Date.today,
    )

    remarks = fields.Text()

    _sql_constraints = [
        (
            "employee_challenge_unique",
            "unique(employee_id, challenge_id)",
            "Employee already joined this challenge.",
        ),
    ]

    @api.constrains("approval_status", "proof")
    def _check_proof(self):
        for record in self:
            if record.approval_status == "approved" and not record.proof:
                raise ValidationError(
                    "Proof is required before approval."
                )

    @api.constrains("points_earned")
    def _check_points(self):
        for record in self:
            if record.points_earned < 0:
                raise ValidationError(
                    "Points cannot be negative."
                )

    @api.onchange("approval_status")
    def _onchange_approval(self):
        if self.approval_status == "approved" and self.challenge_id:
            self.points_earned = self.challenge_id.points
            self.progress = "completed"
        elif self.approval_status == "rejected":
            self.points_earned = 0
            self.progress = "submitted"