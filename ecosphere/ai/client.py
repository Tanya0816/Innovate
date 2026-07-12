# -*- coding: utf-8 -*-
"""
AI Client
---------
Public entrypoint used by services/controllers. Wraps AIProvider
with retries, logging and env-caching so callers never touch
provider.py directly.
"""

import logging
from .provider import AIProvider

_logger = logging.getLogger(__name__)


class AIClient:
    _instance_cache = {}

    def __init__(self, env):
        self.env = env
        self._provider = AIProvider(env)

    @classmethod
    def get(cls, env):
        """Return a cached client per-request (cheap re-use, no globals across requests)."""
        return cls(env)

    def ask(self, prompt, system=None, max_tokens=1024, retries=1):
        last_error = None
        for attempt in range(retries + 1):
            try:
                return self._provider.generate(prompt, system=system, max_tokens=max_tokens)
            except Exception as exc:  # noqa: BLE001
                last_error = exc
                _logger.warning("AI call failed (attempt %s/%s): %s", attempt + 1, retries + 1, exc)
        raise last_error

    def ask_json(self, prompt, system=None, max_tokens=1024):
        return self._provider.generate_structured(prompt, system=system, max_tokens=max_tokens)
