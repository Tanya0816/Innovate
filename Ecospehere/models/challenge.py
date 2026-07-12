from odoo import api, fields, models
from odoo.exceptions import ValidationError
from datetime import date


class ESGChallenge(models.Model):
    _name = "esg.challenge"
    _description = "ESG Challenge"
    _rec_name = "title"
    _order = "deadline"

    title = fields.Char(
        string="Challenge Title",
        required=True,
    )

    category_id = fields.Many2one(
        "esg.category",
        string="Category",
        required=True,
        ondelete="restrict",
    )

    description = fields.Text(
        string="Description",
        required=True,
    )

    points = fields.Integer(
        string="Points Reward",
        required=True,
        default=10,
    )

    difficulty = fields.Selection(
        [
            ("easy", "Easy"),
            ("medium", "Medium"),
            ("hard", "Hard"),
        ],
        string="Difficulty",
        required=True,
        default="easy",
    )

    evidence_required = fields.Boolean(
        string="Evidence Required",
        default=True,
    )

    deadline = fields.Date(
        string="Deadline",
        required=True,
    )

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("active", "Active"),
            ("under_review", "Under Review"),
            ("completed", "Completed"),
            ("archived", "Archived"),
        ],
        string="Status",
        default="draft",
        required=True,
    )

    active = fields.Boolean(
        default=True,
    )

    participation_ids = fields.One2many(
        "esg.challenge.participation",
        "challenge_id",
        string="Participations",
    )

    _sql_constraints = [
        (
            "challenge_title_unique",
            "unique(title, category_id)",
            "Challenge title already exists for this category.",
        ),
    ]

    @api.constrains("title")
    def _check_title(self):
        for record in self:
            if not record.title or not record.title.strip():
                raise ValidationError(
                    "Challenge title cannot be empty."
                )

    @api.constrains("points")
    def _check_xp(self):
        for record in self:
            if record.points <= 0:
                raise ValidationError(
                    "Points must be greater than zero."
                )

    @api.constrains("deadline")
    def _check_deadline(self):
        today = date.today()
        for record in self:
            if record.deadline and record.deadline < today:
                raise ValidationError(
                    "Deadline cannot be in the past."
                )

