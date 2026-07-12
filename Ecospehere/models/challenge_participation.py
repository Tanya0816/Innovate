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
            ("Started", "Started"),
            ("In Progress", "In Progress"),
            ("Completed", "Completed"),
        ],
        string="Progress",
        default="Started",
        required=True,
    )

    proof = fields.Binary(
        string="Proof",
    )

    proof_filename = fields.Char(
        string="Proof Filename",
    )

    approval_status = fields.Selection(
        [
            ("Pending", "Pending"),
            ("Approved", "Approved"),
            ("Rejected", "Rejected"),
        ],
        string="Approval Status",
        default="Pending",
        required=True,
    )

    points_earned = fields.Integer(
        string="Points Earned",
        default=0,
    )

    completion_date = fields.Date(
        string="Completion Date",
    )

    remarks = fields.Text(
        string="Remarks",
    )

    _sql_constraints = [
        (
            "employee_challenge_unique",
            "unique(employee_id, challenge_id)",
            "An employee can only participate in a challenge once.",
        ),
    ]

    @api.constrains("approval_status", "proof", "challenge_id")
    def _check_proof_for_approval(self):
        for record in self:
            if (
                record.approval_status == "Approved"
                and record.challenge_id
                and record.challenge_id.evidence_required
                and not record.proof
            ):
                raise ValidationError("Proof is required to approve this challenge participation.")

    def write(self, vals):
        res = super().write(vals)
        for record in self:
            if "approval_status" in vals:
                if record.approval_status == "Approved":
                    record.points_earned = record.challenge_id.points
                    record.progress = "Completed"
                    if not record.completion_date:
                        record.completion_date = fields.Date.today()
                else:
                    record.points_earned = 0
        return res

    @api.model
    def create(self, vals):
        record = super().create(vals)
        if record.approval_status == "Approved":
            record.points_earned = record.challenge_id.points
            record.progress = "Completed"
            if not record.completion_date:
                record.completion_date = fields.Date.today()
        return record
