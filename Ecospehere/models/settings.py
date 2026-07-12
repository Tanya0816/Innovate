from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    environmental_weight = fields.Float(
        string="Environmental Weight",
        config_parameter="esg.environmental_weight",
        default=40.0,
        required=True,
    )

    social_weight = fields.Float(
        string="Social Weight",
        config_parameter="esg.social_weight",
        default=30.0,
        required=True,
    )

    governance_weight = fields.Float(
        string="Governance Weight",
        config_parameter="esg.governance_weight",
        default=30.0,
        required=True,
    )

    auto_emission = fields.Boolean(
        string="Auto Emission Calculation",
        config_parameter="esg.auto_emission",
        default=True,
    )

    evidence_required = fields.Boolean(
        string="Evidence Required",
        config_parameter="esg.evidence_required",
        default=True,
    )

    badge_auto_award = fields.Boolean(
        string="Auto Badge Award",
        config_parameter="esg.badge_auto_award",
        default=True,
    )

    notification_enabled = fields.Boolean(
        string="Enable Notifications",
        config_parameter="esg.notification_enabled",
        default=True,
    )