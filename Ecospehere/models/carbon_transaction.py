from odoo import api, fields, models
from odoo.exceptions import ValidationError


class ESGCarbonTransaction(models.Model):
    _name = "esg.carbon.transaction"
    _description = "Carbon Transaction"
    _rec_name = "reference"
    _order = "transaction_date desc"

    reference = fields.Char(
        string="Reference",
        required=True,
        readonly=True,
        copy=False,
        default="New",
    )

    transaction_date = fields.Date(
        string="Transaction Date",
        required=True,
        default=fields.Date.today,
    )

    source_type = fields.Selection(
        [
            ("purchase", "Purchase"),
            ("manufacturing", "Manufacturing"),
            ("expense", "Expense"),
            ("fleet", "Fleet"),
        ],
        string="Source",
        required=True,
    )

    department_id = fields.Many2one(
        "esg.department",
        required=True,
        ondelete="restrict",
    )

    product_id = fields.Many2one(
        "esg.product.profile",
        string="Product",
        ondelete="restrict",
    )

    emission_factor_id = fields.Many2one(
        "esg.emission.factor",
        required=True,
        ondelete="restrict",
    )

    quantity = fields.Float(
        string="Quantity",
        required=True,
    )

    emission = fields.Float(
        string="Carbon Emission",
        compute="_compute_emission",
        store=True,
        readonly=True,
    )

    unit = fields.Char(
        related="emission_factor_id.unit",
        store=True,
        readonly=True,
    )

    remarks = fields.Text()

    state = fields.Selection(
        [
            ("draft", "Draft"),
            ("confirmed", "Confirmed"),
        ],
        default="draft",
    )

    _sql_constraints = [
        (
            "reference_unique",
            "unique(reference)",
            "Reference already exists.",
        ),
    ]

    @api.depends("quantity", "emission_factor_id.emission_factor")
    def _compute_emission(self):
        for record in self:
            factor = record.emission_factor_id.emission_factor or 0
            record.emission = record.quantity * factor

    @api.constrains("quantity")
    def _check_quantity(self):
        for record in self:
            if record.quantity <= 0:
                raise ValidationError(
                    "Quantity must be greater than zero."
                )

    @api.constrains("emission_factor_id")
    def _check_factor(self):
        for record in self:
            if not record.emission_factor_id or record.emission_factor_id.emission_factor <= 0:
                raise ValidationError(
                    "Selected emission factor is invalid."
                )

    @api.model
    def create(self, vals):
        if vals.get("reference") in (False, "", "New"):
            vals["reference"] = self._get_next_reference()
        return super().create(vals)

    def _get_next_reference(self):
        last_record = self.search([], order="id desc", limit=1)
        if not last_record:
            return "CT0001"

        try:
            last_number = int(last_record.reference.replace("CT", ""))
        except Exception:
            last_number = 0

        return f"CT{last_number + 1:04d}"
