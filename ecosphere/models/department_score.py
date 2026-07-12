# -*- coding: utf-8 -*-
from odoo import models, fields


class DepartmentScore(models.Model):
    """ORM model only. Populated exclusively by
    services/score/department_score.py — never write scores here directly.
    """
    _name = 'department.score'
    _description = 'Department ESG Score Snapshot'
    _order = 'period_end desc'

    department_id = fields.Many2one('department', required=True, index=True, ondelete='cascade')
    period_start = fields.Date(required=True)
    period_end = fields.Date(required=True)

    environment_score = fields.Float(required=True)
    social_score = fields.Float(required=True)
    governance_score = fields.Float(required=True)
    overall_score = fields.Float(required=True)
    grade = fields.Char()

    _sql_constraints = [
        ('period_check', 'CHECK(period_start <= period_end)', 'Period start must be before period end.'),
    ]
