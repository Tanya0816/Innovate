# -*- coding: utf-8 -*-
"""Organization-wide ESG score aggregation (feeds the executive dashboard)."""

from .score_engine import ScoreEngine


class OrganizationScoreService:
    """Rolls up all department.score records into a single
    organization-level snapshot for the executive dashboard.
    """

    def __init__(self, env):
        self.env = env
        self.engine = ScoreEngine()

    def compute_snapshot(self, period_start=None, period_end=None):
        domain = []
        if period_start:
            domain.append(('period_start', '>=', period_start))
        if period_end:
            domain.append(('period_end', '<=', period_end))

        dept_scores = self.env['department.score'].sudo().search(domain)
        if not dept_scores:
            return self._empty_snapshot()

        environment_score = self.engine.compute_pillar_score(dept_scores.mapped('environment_score'))
        social_score = self.engine.compute_pillar_score(dept_scores.mapped('social_score'))
        governance_score = self.engine.compute_pillar_score(dept_scores.mapped('governance_score'))
        overall = self.engine.compute_overall_score(environment_score, social_score, governance_score)

        return {
            'environment_score': environment_score,
            'social_score': social_score,
            'governance_score': governance_score,
            'overall_score': overall,
            'grade': self.engine.grade_for_score(overall),
            'department_count': len(dept_scores.mapped('department_id')),
        }

    def get_latest_snapshot(self):
        """Convenience method used by the AI assistant and dashboard KPI cards."""
        return self.compute_snapshot()

    def _empty_snapshot(self):
        return {
            'environment_score': 0.0,
            'social_score': 0.0,
            'governance_score': 0.0,
            'overall_score': 0.0,
            'grade': 'N/A',
            'department_count': 0,
        }
