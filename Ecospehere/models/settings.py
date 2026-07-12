from odoo import fields, models


class ESGSettings(models.Model):
    _name = "esg.settings"
    _description = "EcoSphere Settings"

    name = fields.Char(default="Default Configuration")

    environmental_weight = fields.Float(
        string="Environmental Weight",
        default=40.0,
        required=True,
    )

    social_weight = fields.Float(
        string="Social Weight",
        default=30.0,
        required=True,
    )

    governance_weight = fields.Float(
        string="Governance Weight",
        default=30.0,
        required=True,
    )

    auto_emission = fields.Boolean(
        string="Auto Emission Calculation",
        default=True,
    )

    evidence_required = fields.Boolean(
        string="Evidence Required",
        default=True,
    )

    badge_auto_award = fields.Boolean(
        string="Auto Badge Award",
        default=True,
    )

    notification_enabled = fields.Boolean(
        string="Enable Notifications",
        default=True,
    )
