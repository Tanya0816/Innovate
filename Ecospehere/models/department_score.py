from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGDepartmentScore(models.Model):
    _name = "esg.department.score"
    _description = "Department Score"
    _rec_name = "department_id"
    _order = "score_date desc"

    department_id = fields.Many2one(
        "esg.department",
        string="Department",
        required=True,
        ondelete="restrict",
    )

    score_date = fields.Date(
        string="Score Date",
        default=fields.Date.today,
        required=True,
    )

    environment_score = fields.Float(
        string="Environment Score",
        default=0.0,
    )

    social_score = fields.Float(
        string="Social Score",
        default=0.0,
    )

    governance_score = fields.Float(
        string="Governance Score",
        default=0.0,
    )

    overall_score = fields.Float(
        string="Overall Score",
        compute="_compute_overall_score",
        store=True,
    )

    status = fields.Selection(
        [
            ("good", "Good"),
            ("warning", "Needs Attention"),
            ("critical", "Critical"),
        ],
        default="warning",
        required=True,
    )

    remarks = fields.Text(
        string="Remarks",
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "department_score_unique",
            "unique(department_id, score_date)",
            "A score record already exists for this department and date.",
        ),
    ]

    @api.depends(
        "environment_score",
        "social_score",
        "governance_score",
    )
    def _compute_overall_score(self):
        for record in self:
            total = sum(
                [
                    record.environment_score,
                    record.social_score,
                    record.governance_score,
                ]
            )
            record.overall_score = total / 3

    @api.constrains("environment_score", "social_score", "governance_score")
    def _check_scores(self):
        for record in self:
            for score in (
                record.environment_score,
                record.social_score,
                record.governance_score,
            ):
                if score < 0 or score > 100:
                    raise ValidationError(
                        "Each score must be between 0 and 100."
                    )

    @api.constrains("overall_score")
    def _check_overall(self):
        for record in self:
            if record.overall_score < 0 or record.overall_score > 100:
                raise ValidationError(
                    "Overall score must be between 0 and 100."
                )