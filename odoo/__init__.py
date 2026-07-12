from . import fields, models
from .exceptions import ValidationError


class _API:
    @staticmethod
    def constrains(*args, **kwargs):
        def decorator(func):
            return func
        return decorator


api = _API()

__all__ = ["api", "fields", "models", "ValidationError"]
