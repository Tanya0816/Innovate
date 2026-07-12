class _DummyField:
    def __init__(self, *args, **kwargs):
        pass


class _DummyFields:
    Char = _DummyField
    Text = _DummyField
    Selection = _DummyField
    Boolean = _DummyField
    Many2one = _DummyField
    Float = _DummyField
    Date = _DummyField
    Integer = _DummyField


fields = _DummyFields()
