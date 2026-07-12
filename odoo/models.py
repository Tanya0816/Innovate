class Model:
    def __init_subclass__(cls, **kwargs):
        return type.__init_subclass__(cls, **kwargs)


models = type("models", (), {"Model": Model})
