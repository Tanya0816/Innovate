# -*- coding: utf-8 -*-
"""AI report narrative generation service."""

import logging
from ..client import AIClient
from ..prompts.report_prompt import build_report_prompt, SYSTEM_PROMPT

_logger = logging.getLogger(__name__)


class AIReportService:
    """Generates natural-language ESG report narratives.

    Consumed by Developer 3's report builder (services/governance or
    reports/) to append an AI-written executive summary to PDF/Excel
    exports. Keeps AI concerns fully isolated from the report engine.
    """

    def __init__(self, env):
        self.env = env
        self.client = AIClient.get(env)

    def generate_narrative(self, company_name, period, esg_data):
        prompt = build_report_prompt(company_name, period, esg_data)
        try:
            return self.client.ask(prompt, system=SYSTEM_PROMPT, max_tokens=600)
        except Exception as exc:  # noqa: BLE001
            _logger.error("Report narrative generation failed: %s", exc)
            return "AI narrative unavailable at this time."
