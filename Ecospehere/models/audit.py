from datetime import date

from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGAudit(models.Model):
    _name = "esg.audit"
    _description = "ESG Audit"
    _rec_name = "name"
    _order = "audit_date desc"

    name = fields.Char(
        string="Audit Name",
        required=True,
    )

    audit_code = fields.Char(
        string="Audit Code",
        required=True,
    )

    department_id = fields.Many2one(
        "esg.department",
        string="Department",
        required=True,
        ondelete="restrict",
    )

    policy_id = fields.Many2one(
        "esg.policy",
        string="Policy",
        required=True,
        ondelete="restrict",
    )

    auditor_id = fields.Many2one(
        "hr.employee",
        string="Auditor",
        required=True,
        ondelete="set null",
    )

    audit_date = fields.Date(
        string="Audit Date",
        default=fields.Date.today,
        required=True,
    )

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("scheduled", "Scheduled"),
            ("completed", "Completed"),
            ("non_compliant", "Non-compliant"),
        ],
        default="draft",
        required=True,
    )

    findings = fields.Text(
        string="Findings",
    )

    score = fields.Float(
        string="Score",
        default=0.0,
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "audit_code_unique",
            "unique(audit_code)",
            "Audit code already exists.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError("Audit name cannot be empty.")

    @api.constrains("audit_code")
    def _check_code(self):
        for record in self:
            if not record.audit_code or not record.audit_code.strip():
                raise ValidationError("Audit code cannot be empty.")

    @api.constrains("score")
    def _check_score(self):
        for record in self:
            if record.score < 0 or record.score > 100:
                raise ValidationError("Score must be between 0 and 100.")

    @api.constrains("audit_date")
    def _check_date(self):
        for record in self:
            if record.audit_date and record.audit_date > date.today():
                raise ValidationError("Audit date cannot be in the future.")