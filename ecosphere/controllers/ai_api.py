# -*- coding: utf-8 -*-
"""AI-related JSON endpoints: assistant chat, recommendations."""

from odoo import http
from odoo.http import request

from ..ai.services.assistant_service import AIAssistantService
from ..ai.services.recommendation_service import AIRecommendationService


class AIController(http.Controller):

    @http.route('/ecosphere/ai/ask', type='json', auth='user')
    def ask_assistant(self, question, history=None):
        service = AIAssistantService(request.env)
        answer = service.ask(question, conversation_history=history, user=request.env.user)
        return {'answer': answer}

    @http.route('/ecosphere/ai/recommendations', type='json', auth='user')
    def get_recommendations(self, department_name, weak_areas, historical_trend=None):
        service = AIRecommendationService(request.env)
        recommendations = service.get_recommendations(
            department_name, weak_areas, historical_trend or []
        )
        return {'recommendations': recommendations}
