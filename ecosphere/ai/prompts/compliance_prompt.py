# -*- coding: utf-8 -*-
"""Prompt builders for AI-assisted compliance issue triage."""


def build_compliance_prompt(issue_description, policy_reference):
    return f"""
Compliance issue reported: "{issue_description}"
Related policy reference: {policy_reference}

Classify this issue's severity as one of: low, medium, high, critical.
Then give a one-paragraph (max 80 words) suggested remediation step.
Respond as JSON: {{"severity": "...", "remediation": "..."}}
""".strip()


SYSTEM_PROMPT = (
    "You are a compliance triage assistant. Be conservative: when uncertain "
    "between two severities, choose the higher one."
)
