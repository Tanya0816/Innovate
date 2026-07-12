try:
    from odoo import api, fields, models
    from odoo.exceptions import ValidationError
except Exception:  # pragma: no cover - fallback for static analysis / editors
    class _FakeField:
        def __init__(self, *a, **k):
            pass

    class _FakeFields:
        Char = _FakeField
        Text = _FakeField
        Selection = _FakeField
        Boolean = _FakeField

    class _FakeModel:
        def __init_subclass__(cls, **kwargs):
            return type.__init_subclass__(cls, **kwargs)

    class ValidationError(Exception):
        pass

    class _FakeAPI:
        @staticmethod
        def constrains(*args, **kwargs):
            def decorator(func):
                return func
            return decorator

    api = _FakeAPI()
    fields = _FakeFields()
    models = type("models", (), {"Model": _FakeModel})


class ESGCategory(models.Model):
    _name = "esg.category"
    _description = "ESG Category"
    _rec_name = "name"
    _order = "type, name"

    name = fields.Char(
        string="Category Name",
        required=True,
    )

    type = fields.Selection(
        [
            ("csr", "CSR Activity"),
            ("challenge", "Challenge"),
        ],
        string="Category Type",
        required=True,
    )

    description = fields.Text(
        string="Description",
    )

    active = fields.Boolean(
        default=True,
    )

    _sql_constraints = [
        (
            "category_name_type_unique",
            "unique(name, type)",
            "Category already exists for this type.",
        ),
    ]

    @api.constrains("name")
    def _check_name(self):
        for record in self:
            if not record.name or not record.name.strip():
                raise ValidationError(
                    "Category name cannot be empty."
                )
