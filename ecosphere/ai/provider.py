# -*- coding: utf-8 -*-
"""
AI Provider Abstraction Layer
------------------------------
Single point of change if the org switches AI vendors
(Gemini -> Claude -> OpenAI ...). Every other file talks to
`AIProvider`, never to a vendor SDK directly.
"""

import logging
import requests
from odoo.exceptions import UserError

_logger = logging.getLogger(__name__)


class AIProvider:
    """Thin adapter around whichever LLM vendor is configured.

    Only this file should ever import a vendor SDK / call a vendor
    endpoint directly. Everything else in the `ai/` package depends
    only on `generate()` and `generate_structured()`.
    """

    def __init__(self, env):
        self.env = env
        icp = env['ir.config_parameter'].sudo()
        self.provider_name = icp.get_param('ecosphere.ai_provider', default='gemini')
        self.api_key = icp.get_param('ecosphere.ai_api_key', default='')
        self.model = icp.get_param('ecosphere.ai_model', default='gemini-1.5-flash')
        self.timeout = int(icp.get_param('ecosphere.ai_timeout', default='30'))

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------
    def generate(self, prompt, system=None, max_tokens=1024):
        """Return plain text completion for `prompt`."""
        if not self.api_key:
            raise UserError("AI provider is not configured. Set 'ecosphere.ai_api_key' in Settings.")

        if self.provider_name == 'gemini':
            return self._call_gemini(prompt, system, max_tokens)
        elif self.provider_name == 'claude':
            return self._call_claude(prompt, system, max_tokens)
        elif self.provider_name == 'openai':
            return self._call_openai(prompt, system, max_tokens)
        else:
            raise UserError(f"Unsupported AI provider: {self.provider_name}")

    def generate_structured(self, prompt, system=None, max_tokens=1024):
        """Ask the model to respond ONLY with JSON and parse it."""
        import json
        strict_system = (system or '') + (
            "\n\nIMPORTANT: Respond with ONLY valid JSON. "
            "No markdown fences, no preamble, no explanation."
        )
        raw = self.generate(prompt, system=strict_system, max_tokens=max_tokens)
        cleaned = raw.strip().replace('```json', '').replace('```', '').strip()
        try:
            return json.loads(cleaned)
        except ValueError:
            _logger.warning("AI provider returned non-JSON payload: %s", cleaned)
            return {}

    # ------------------------------------------------------------------
    # Vendor-specific implementations (private)
    # ------------------------------------------------------------------
    def _call_gemini(self, prompt, system, max_tokens):
        url = (
            f"https://generativelanguage.googleapis.com/v1beta/models/"
            f"{self.model}:generateContent?key={self.api_key}"
        )
        contents = []
        if system:
            contents.append({"role": "user", "parts": [{"text": system}]})
        contents.append({"role": "user", "parts": [{"text": prompt}]})
        payload = {
            "contents": contents,
            "generationConfig": {"maxOutputTokens": max_tokens},
        }
        resp = requests.post(url, json=payload, timeout=self.timeout)
        resp.raise_for_status()
        data = resp.json()
        return data['candidates'][0]['content']['parts'][0]['text']

    def _call_claude(self, prompt, system, max_tokens):
        url = "https://api.anthropic.com/v1/messages"
        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        }
        payload = {
            "model": self.model or "claude-sonnet-4-6",
            "max_tokens": max_tokens,
            "messages": [{"role": "user", "content": prompt}],
        }
        if system:
            payload["system"] = system
        resp = requests.post(url, headers=headers, json=payload, timeout=self.timeout)
        resp.raise_for_status()
        data = resp.json()
        return "".join(block.get('text', '') for block in data.get('content', []))

    def _call_openai(self, prompt, system, max_tokens):
        url = "https://api.openai.com/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        messages = []
        if system:
            messages.append({"role": "system", "content": system})
        messages.append({"role": "user", "content": prompt})
        payload = {"model": self.model or "gpt-4o-mini", "messages": messages, "max_tokens": max_tokens}
        resp = requests.post(url, headers=headers, json=payload, timeout=self.timeout)
        resp.raise_for_status()
        data = resp.json()
        return data['choices'][0]['message']['content']
