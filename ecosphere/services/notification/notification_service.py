# -*- coding: utf-8 -*-
"""Notification creation & querying service."""

import logging

_logger = logging.getLogger(__name__)


class NotificationService:
    """Creates in-app `notification` records and delegates delivery
    (email / in-app bell / future push) to NotificationDispatcher.
    Other developers' modules call `notify()` rather than writing to
    the notification model directly, so delivery channels can change
    without touching their code.
    """

    def __init__(self, env):
        self.env = env

    def notify(self, user, title, message, category='info', res_model=None, res_id=None):
        """category: info | success | warning | danger — drives the UI badge color."""
        notification = self.env['notification'].sudo().create({
            'user_id': user.id,
            'title': title,
            'message': message,
            'category': category,
            'res_model': res_model,
            'res_id': res_id,
            'is_read': False,
        })
        from .notification_dispatcher import NotificationDispatcher
        NotificationDispatcher(self.env).dispatch(notification)
        return notification

    def notify_multiple(self, users, title, message, category='info'):
        return [self.notify(u, title, message, category) for u in users]

    def get_unread_for_user(self, user, limit=20):
        return self.env['notification'].sudo().search(
            [('user_id', '=', user.id), ('is_read', '=', False)],
            order='create_date desc', limit=limit,
        )

    def mark_read(self, notification_ids):
        notifications = self.env['notification'].sudo().browse(notification_ids)
        notifications.write({'is_read': True})
        return True

    def mark_all_read(self, user):
        unread = self.get_unread_for_user(user, limit=0)
        unread.write({'is_read': True})
        return True
