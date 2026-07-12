# -*- coding: utf-8 -*-
"""AI-driven improvement recommendation service."""

import logging
from ..client import AIClient
from ..prompts.recommendation_prompt import build_recommendation_prompt, SYSTEM_PROMPT

_logger = logging.getLogger(__name__)


class AIRecommendationService:
    """Suggests improvement actions for a department based on its
    weakest ESG pillars. Used by the executive dashboard 'Insights'
    panel and by department score pages.
    """

    def __init__(self, env):
        self.env = env
        self.client = AIClient.get(env)

    def get_recommendations(self, department_name, weak_areas, historical_trend):
        prompt = build_recommendation_prompt(department_name, weak_areas, historical_trend)
        try:
            result = self.client.ask_json(prompt, system=SYSTEM_PROMPT, max_tokens=400)
            if isinstance(result, list):
                return result
            return []
        except Exception as exc:  # noqa: BLE001
            _logger.error("Recommendation generation failed: %s", exc)
            return []
