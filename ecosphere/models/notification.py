# -*- coding: utf-8 -*-
from odoo import models, fields, api


class Notification(models.Model):
    """ORM model only — all creation/dispatch logic lives in
    services/notification/. This class must stay free of business logic.
    """
    _name = 'notification'
    _description = 'ESG Platform Notification'
    _order = 'create_date desc'

    user_id = fields.Many2one('res.users', required=True, index=True, ondelete='cascade')
    title = fields.Char(required=True)
    message = fields.Text(required=True)
    category = fields.Selection([
        ('info', 'Info'),
        ('success', 'Success'),
        ('warning', 'Warning'),
        ('danger', 'Danger'),
    ], default='info', required=True)
    is_read = fields.Boolean(default=False, index=True)
    res_model = fields.Char(help="Related model, e.g. 'compliance.issue'")
    res_id = fields.Integer(help="Related record ID")

    @api.model
    def get_unread_count(self, user_id=None):
        uid = user_id or self.env.user.id
        return self.search_count([('user_id', '=', uid), ('is_read', '=', False)])
