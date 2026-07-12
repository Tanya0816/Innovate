# -*- coding: utf-8 -*-
"""Prompt builders for AI-generated ESG report narratives."""


def build_report_prompt(company_name, period, esg_data):
    """esg_data: dict with keys environment/social/governance metrics."""
    return f"""
You are an ESG reporting analyst. Write a concise executive narrative
(max 350 words) for {company_name}'s ESG performance for {period}.

Data:
- Environment: {esg_data.get('environment')}
- Social: {esg_data.get('social')}
- Governance: {esg_data.get('governance')}
- Overall ESG Score: {esg_data.get('overall_score')}

Structure the response as:
1. Executive summary (2-3 sentences)
2. Key wins
3. Areas needing attention
4. One forward-looking recommendation
""".strip()


SYSTEM_PROMPT = (
    "You are a precise, neutral ESG reporting assistant. "
    "Never fabricate numbers not present in the input data."
)
