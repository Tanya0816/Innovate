from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGComplianceIssue(models.Model):
    _name = "esg.compliance.issue"
    _description = "Compliance Issue"
    _rec_name = "title"
    _order = "due_date asc"

    title = fields.Char(
        string="Title",
        required=True,
    )

    audit_id = fields.Many2one(
        "esg.audit",
        string="Audit",
        required=True,
        ondelete="cascade",
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

    owner = fields.Many2one(
        "hr.employee",
        string="Owner",
        required=True,
        ondelete="restrict",
    )

    due_date = fields.Date(
        string="Due Date",
        required=True,
    )

    status = fields.Selection(
        [
            ("Open", "Open"),
            ("Closed", "Closed"),
        ],
        string="Status",
        default="Open",
        required=True,
    )

    is_overdue = fields.Boolean(
        string="Overdue",
        compute="_compute_is_overdue",
    )

    @api.depends("due_date", "status")
    def _compute_is_overdue(self):
        today = fields.Date.today()
        for record in self:
            record.is_overdue = bool(
                record.status != "Closed"
                and record.due_date
                and record.due_date < today
            )

    @api.constrains("title")
    def _check_title(self):
        for record in self:
            if not record.title or not record.title.strip():
                raise ValidationError("Title cannot be empty.")
