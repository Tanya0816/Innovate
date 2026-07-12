# -*- coding: utf-8 -*-
"""Prompt builders for AI-generated improvement recommendations."""


def build_recommendation_prompt(department_name, weak_areas, historical_trend):
    return f"""
Department: {department_name}
Weak ESG areas (lowest scoring pillars): {weak_areas}
Historical trend (last 6 periods): {historical_trend}

Suggest exactly 3 concrete, actionable initiatives this department could run
in the next quarter to improve its weakest pillar(s). Keep each suggestion to
one sentence. Respond as a JSON list of strings only.
""".strip()


SYSTEM_PROMPT = (
    "You are an ESG improvement advisor. Recommendations must be realistic "
    "for a mid-size organization and measurable within one quarter."
)
