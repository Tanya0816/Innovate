from datetime import date

from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGComplianceIssue(models.Model):
    _name = "esg.compliance.issue"
    _description = "Compliance Issue"
    _rec_name = "issue_code"
    _order = "issue_date desc"

    issue_code = fields.Char(
        string="Issue Code",
        required=True,
    )

    name = fields.Char(
        string="Issue Title",
        required=True,
    )

    audit_id = fields.Many2one(
        "esg.audit",
        string="Audit",
        required=True,
        ondelete="restrict",
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

    severity = fields.Selection(
        [
            ("low", "Low"),
            ("medium", "Medium"),
            ("high", "High"),
            ("critical", "Critical"),
        ],
        default="medium",
        required=True,
    )

    status = fields.Selection(
        [
            ("open", "Open"),
            ("in_progress", "In Progress"),
            ("resolved", "Resolved"),
            ("closed", "Closed"),
        ],
        default="open",
        required=True,
    )

    issue_date = fields.Date(
        string="Issue Date",
        default=fields.Date.today,
        required=True,
    )

    description = fields.Text(
        string="Description",
    )

    corrective_action = fields.Text(
        string="Corrective Action",
    )

    resolution_date = fields.Date(
        string="Resolution Date",
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "compliance_issue_code_unique",
            "unique(issue_code)",
            "Compliance issue code already exists.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError("Issue title cannot be empty.")

    @api.constrains("issue_code")
    def _check_code(self):
        for record in self:
            if not record.issue_code or not record.issue_code.strip():
                raise ValidationError("Issue code cannot be empty.")

    @api.constrains("issue_date", "resolution_date")
    def _check_dates(self):
        for record in self:
            if (
                record.issue_date
                and record.resolution_date
                and record.resolution_date < record.issue_date
            ):
                raise ValidationError(
                    "Resolution date cannot be earlier than issue date."
                )

    @api.constrains("issue_date")
    def _check_issue_date(self):
        for record in self:
            if record.issue_date and record.issue_date > date.today():
                raise ValidationError("Issue date cannot be in the future.")