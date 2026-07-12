# -*- coding: utf-8 -*-
"""Executive dashboard JSON endpoints (feeds the OWL dashboard app)."""

from odoo import http
from odoo.http import request

from ..services.score.organization_score import OrganizationScoreService
from ..services.score.department_score import DepartmentScoreService


class DashboardController(http.Controller):

    @http.route('/ecosphere/dashboard/summary', type='json', auth='user')
    def get_summary(self, period_start=None, period_end=None):
        """Overall ESG score + pillar breakdown for the top KPI cards."""
        service = OrganizationScoreService(request.env)
        return service.compute_snapshot(period_start, period_end)

    @http.route('/ecosphere/dashboard/departments', type='json', auth='user')
    def get_department_scores(self, period_start=None, period_end=None):
        """Latest score per department, for the leaderboard/table widget."""
        domain = []
        if period_start:
            domain.append(('period_start', '>=', period_start))
        if period_end:
            domain.append(('period_end', '<=', period_end))
        scores = request.env['department.score'].sudo().search(domain, order='overall_score desc')
        return [{
            'department': s.department_id.name,
            'environment_score': s.environment_score,
            'social_score': s.social_score,
            'governance_score': s.governance_score,
            'overall_score': s.overall_score,
            'grade': s.grade,
        } for s in scores]

    @http.route('/ecosphere/dashboard/recompute', type='json', auth='user')
    def recompute_department_score(self, department_id, period_start, period_end):
        """Manually trigger a recompute (e.g. an admin 'Refresh' button)."""
        department = request.env['department'].sudo().browse(department_id)
        service = DepartmentScoreService(request.env)
        record = service.compute_for_department(department, period_start, period_end)
        return {'overall_score': record.overall_score, 'grade': record.grade}

    @http.route('/ecosphere/dashboard/notifications', type='json', auth='user')
    def get_notifications(self, limit=20):
        from ..services.notification.notification_service import NotificationService
        service = NotificationService(request.env)
        notifications = service.get_unread_for_user(request.env.user, limit=limit)
        return [{
            'id': n.id,
            'title': n.title,
            'message': n.message,
            'category': n.category,
            'create_date': str(n.create_date),
        } for n in notifications]

    @http.route('/ecosphere/dashboard/notifications/mark_read', type='json', auth='user')
    def mark_notifications_read(self, notification_ids=None):
        from ..services.notification.notification_service import NotificationService
        service = NotificationService(request.env)
        if notification_ids:
            service.mark_read(notification_ids)
        else:
            service.mark_all_read(request.env.user)
        return {'success': True}
