# -*- coding: utf-8 -*-
"""Department-level ESG score computation (ORM-facing)."""

from .score_engine import ScoreEngine


class DepartmentScoreService:
    """Aggregates a single department's carbon transactions, CSR
    participation and compliance records into pillar + overall scores,
    then persists them onto `department.score` (model owned jointly,
    written to by Developer 4).
    """

    def __init__(self, env):
        self.env = env
        self.engine = ScoreEngine()

    def compute_for_department(self, department, period_start, period_end):
        environment_score = self._environment_pillar(department, period_start, period_end)
        social_score = self._social_pillar(department, period_start, period_end)
        governance_score = self._governance_pillar(department, period_start, period_end)

        overall = self.engine.compute_overall_score(environment_score, social_score, governance_score)

        record = self.env['department.score'].sudo().create({
            'department_id': department.id,
            'period_start': period_start,
            'period_end': period_end,
            'environment_score': environment_score,
            'social_score': social_score,
            'governance_score': governance_score,
            'overall_score': overall,
            'grade': self.engine.grade_for_score(overall),
        })
        return record

    # ------------------------------------------------------------------
    # Pillar calculators — delegate raw data gathering to Developer 1/2/3
    # repositories via the ORM; this service only orchestrates.
    # ------------------------------------------------------------------
    def _environment_pillar(self, department, start, end):
        transactions = self.env['carbon.transaction'].sudo().search([
            ('department_id', '=', department.id),
            ('date', '>=', start),
            ('date', '<=', end),
        ])
        if not transactions:
            return 0.0
        sub_scores = [t.efficiency_score for t in transactions if hasattr(t, 'efficiency_score')]
        return self.engine.compute_pillar_score(sub_scores)

    def _social_pillar(self, department, start, end):
        participations = self.env['employee.participation'].sudo().search([
            ('department_id', '=', department.id),
            ('date', '>=', start),
            ('date', '<=', end),
        ])
        if not participations:
            return 0.0
        sub_scores = [p.impact_score for p in participations if hasattr(p, 'impact_score')]
        return self.engine.compute_pillar_score(sub_scores)

    def _governance_pillar(self, department, start, end):
        issues = self.env['compliance.issue'].sudo().search([
            ('department_id', '=', department.id),
            ('date', '>=', start),
            ('date', '<=', end),
        ])
        acknowledgements = self.env['policy.acknowledgement'].sudo().search([
            ('department_id', '=', department.id),
        ])
        total_policies = self.env['policy'].sudo().search_count([])
        ack_rate = (len(acknowledgements) / total_policies * 100) if total_policies else 100.0
        issue_penalty = min(len(issues) * 5, 50)
        governance_score = max(0.0, ack_rate - issue_penalty)
        return self.engine.compute_pillar_score([governance_score])
