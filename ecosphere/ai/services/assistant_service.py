# -*- coding: utf-8 -*-
"""Conversational AI assistant service (chat widget backend)."""

import logging
from ..client import AIClient

_logger = logging.getLogger(__name__)

ASSISTANT_SYSTEM_PROMPT = (
    "You are the EcoSphere ESG Assistant embedded in an Odoo dashboard. "
    "Answer questions about the organization's ESG data, scores, policies "
    "and sustainability challenges. Be concise (max 150 words) and never "
    "invent figures — if you don't have the data, say so and suggest where "
    "the user can find it in the platform."
)


class AIAssistantService:
    """Backs the floating AI assistant widget. Maintains a lightweight
    per-session conversation history (passed in by the controller,
    since the AI API itself is stateless).
    """

    def __init__(self, env):
        self.env = env
        self.client = AIClient.get(env)

    def build_context_block(self, user):
        """Pull a small snapshot of live data so the assistant can
        answer with real numbers instead of guessing.
        """
        from ...services.score.organization_score import OrganizationScoreService
        score_service = OrganizationScoreService(self.env)
        snapshot = score_service.get_latest_snapshot()
        return (
            f"Current overall ESG score: {snapshot.get('overall_score')}\n"
            f"Environment: {snapshot.get('environment_score')}, "
            f"Social: {snapshot.get('social_score')}, "
            f"Governance: {snapshot.get('governance_score')}\n"
            f"User: {user.name} ({user.department_id.name if user.department_id else 'N/A'})"
        )

    def ask(self, question, conversation_history=None, user=None):
        context_block = self.build_context_block(user) if user else ""
        history_text = ""
        if conversation_history:
            history_text = "\n".join(
                f"{turn['role']}: {turn['content']}" for turn in conversation_history[-6:]
            )
        prompt = f"{context_block}\n\n{history_text}\n\nuser: {question}".strip()
        try:
            return self.client.ask(prompt, system=ASSISTANT_SYSTEM_PROMPT, max_tokens=500)
        except Exception as exc:  # noqa: BLE001
            _logger.error("Assistant service failed: %s", exc)
            return "Sorry, the AI assistant is temporarily unavailable."
