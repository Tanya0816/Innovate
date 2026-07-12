# -*- coding: utf-8 -*-
"""
Core ESG Score Engine
----------------------
Pure calculation logic — no ORM writes here. Reads raw pillar inputs
(handed to it by department_score.py / organization_score.py, which
DO talk to the ORM) and returns computed scores. Keeping this pure
makes it independently unit-testable.
"""


class ScoreEngine:
    """Weighted ESG scoring algorithm.

    Default weights follow a common ESG convention (E=40%, S=30%, G=30%)
    but are configurable via ir.config_parameter so the org can tune them
    without touching code.
    """

    DEFAULT_WEIGHTS = {
        'environment': 0.40,
        'social': 0.30,
        'governance': 0.30,
    }

    def __init__(self, weights=None):
        self.weights = weights or self.DEFAULT_WEIGHTS

    def compute_pillar_score(self, sub_scores):
        """sub_scores: list of floats (0-100) for a single pillar's
        underlying metrics. Returns the simple mean, clamped to [0,100].
        """
        if not sub_scores:
            return 0.0
        value = sum(sub_scores) / len(sub_scores)
        return max(0.0, min(100.0, round(value, 2)))

    def compute_overall_score(self, environment_score, social_score, governance_score):
        overall = (
            environment_score * self.weights['environment']
            + social_score * self.weights['social']
            + governance_score * self.weights['governance']
        )
        return round(overall, 2)

    def grade_for_score(self, score):
        """Map a numeric score to a letter grade for the UI (badges, gauges)."""
        if score >= 90:
            return 'A+'
        if score >= 80:
            return 'A'
        if score >= 70:
            return 'B'
        if score >= 60:
            return 'C'
        if score >= 50:
            return 'D'
        return 'F'
