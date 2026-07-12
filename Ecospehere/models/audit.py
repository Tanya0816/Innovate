from datetime import date
from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGAudit(models.Model):
    _name = "esg.audit"
    _description = "Governance Audit"
    _rec_name = "audit_name"
    _order = "audit_date desc"

    audit_name = fields.Char(
        string="Audit Name",
        required=True,
    )

    audit_type = fields.Char(
        string="Audit Type",
        required=True,
    )

    department_id = fields.Many2one(
        "esg.department",
        string="Department",
        required=True,
        ondelete="restrict",
    )

    auditor = fields.Many2one(
        "hr.employee",
        string="Auditor",
        required=True,
        ondelete="restrict",
    )

    audit_date = fields.Date(
        string="Audit Date",
        default=fields.Date.today,
        required=True,
    )

    severity = fields.Selection(
        [
            ("low", "Low"),
            ("medium", "Medium"),
            ("high", "High"),
            ("critical", "Critical"),
        ],
        string="Severity",
        default="medium",
        required=True,
    )

    description = fields.Text(
        string="Description",
    )

    status = fields.Selection(
        [
            ("draft", "Draft"),
            ("scheduled", "Scheduled"),
            ("completed", "Completed"),
            ("closed", "Closed"),
        ],
        string="Status",
        default="draft",
        required=True,
    )

    _sql_constraints = [
        (
            "audit_name_unique",
            "unique(audit_name)",
            "Audit name must be unique.",
        ),
    ]

    @api.constrains("audit_name")
    def _check_audit_name(self):
        for record in self:
            if not record.audit_name or not record.audit_name.strip():
                raise ValidationError("Audit name cannot be empty.")

    @api.constrains("audit_type")
    def _check_audit_type(self):
        for record in self:
            if not record.audit_type or not record.audit_type.strip():
                raise ValidationError("Audit type cannot be empty.")
