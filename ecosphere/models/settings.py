# -*- coding: utf-8 -*-
from odoo import models, fields


class EcoSphereSettings(models.TransientModel):
    """Exposes AI provider configuration in Settings > EcoSphere.
    Values are stored as ir.config_parameter and read by ai/provider.py.
    """
    _name = 'ecosphere.settings'
    _inherit = 'res.config.settings'
    _description = 'EcoSphere Configuration'

    ai_provider = fields.Selection([
        ('gemini', 'Google Gemini'),
        ('claude', 'Anthropic Claude'),
        ('openai', 'OpenAI'),
    ], string='AI Provider', config_parameter='ecosphere.ai_provider', default='gemini')

    ai_api_key = fields.Char(string='AI API Key', config_parameter='ecosphere.ai_api_key')

    ai_model = fields.Char(string='AI Model', config_parameter='ecosphere.ai_model',
                            default='gemini-1.5-flash')

    ai_timeout = fields.Integer(string='AI Request Timeout (s)',
                                 config_parameter='ecosphere.ai_timeout', default=30)

    esg_weight_environment = fields.Float(string='Environment Weight',
                                           config_parameter='ecosphere.weight_environment', default=0.40)
    esg_weight_social = fields.Float(string='Social Weight',
                                      config_parameter='ecosphere.weight_social', default=0.30)
    esg_weight_governance = fields.Float(string='Governance Weight',
                                          config_parameter='ecosphere.weight_governance', default=0.30)
