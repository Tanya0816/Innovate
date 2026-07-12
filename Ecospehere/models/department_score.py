from odoo import api, fields, models
from odoo.exceptions import ValidationError

class ESGDepartmentScore(models.Model):
    _name = "esg.department.score"
    _description = "Department ESG Score"
    _rec_name = "department_id"

    department_id = fields.Many2one(
        "esg.department",
        string="Department",
        required=True,
        ondelete="restrict",
    )

    environmental_score = fields.Float(
        string="Environmental Score",
        default=0.0,
        required=True,
    )

    social_score = fields.Float(
        string="Social Score",
        default=0.0,
        required=True,
    )

    governance_score = fields.Float(
        string="Governance Score",
        default=0.0,
        required=True,
    )

    total_score = fields.Float(
        string="Total Score",
        compute="_compute_total_score",
        store=True,
    )

    _sql_constraints = [
        (
            "department_score_unique",
            "unique(department_id)",
            "A department can only have one score record.",
        ),
    ]

    @api.depends("environmental_score", "social_score", "governance_score")
    def _compute_total_score(self):
        for record in self:
            record.total_score = (
                (record.environmental_score * 0.40) +
                (record.social_score * 0.30) +
                (record.governance_score * 0.30)
            )

    @api.constrains("environmental_score", "social_score", "governance_score")
    def _check_scores(self):
        for record in self:
            if not (0 <= record.environmental_score <= 100):
                raise ValidationError("Environmental score must be between 0 and 100.")
            if not (0 <= record.social_score <= 100):
                raise ValidationError("Social score must be between 0 and 100.")
            if not (0 <= record.governance_score <= 100):
                raise ValidationError("Governance score must be between 0 and 100.")