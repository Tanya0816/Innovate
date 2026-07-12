# -*- coding: utf-8 -*-
"""Delivery channel dispatcher for notifications (bus / email)."""

import logging

_logger = logging.getLogger(__name__)


class NotificationDispatcher:
    """Pushes a created `notification` record out to live channels.

    Currently supports Odoo's longpolling bus (instant in-app toast)
    and, for 'warning'/'danger' categories, email. Add new channels
    here without touching NotificationService or any calling module.
    """

    EMAIL_CATEGORIES = {'warning', 'danger'}

    def __init__(self, env):
        self.env = env

    def dispatch(self, notification):
        self._push_bus_message(notification)
        if notification.category in self.EMAIL_CATEGORIES:
            self._send_email(notification)

    def _push_bus_message(self, notification):
        try:
            self.env['bus.bus']._sendone(
                notification.user_id.partner_id,
                'ecosphere.notification',
                {
                    'id': notification.id,
                    'title': notification.title,
                    'message': notification.message,
                    'category': notification.category,
                },
            )
        except Exception as exc:  # noqa: BLE001
            _logger.warning("Bus notification failed: %s", exc)

    def _send_email(self, notification):
        try:
            template = self.env.ref('ecosphere.mail_template_notification', raise_if_not_found=False)
            if template:
                template.send_mail(notification.id, force_send=True)
        except Exception as exc:  # noqa: BLE001
            _logger.warning("Notification email failed: %s", exc)
