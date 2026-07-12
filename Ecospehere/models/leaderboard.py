from odoo import api, fields, models, tools


class ESGLeaderboard(models.Model):
    _name = "esg.leaderboard"
    _description = "ESG Leaderboard"
    _auto = False
    _order = "total_points desc"

    employee_id = fields.Many2one(
        "hr.employee",
        string="Employee",
        readonly=True,
    )

    csr_points = fields.Integer(
        string="CSR Points",
        readonly=True,
    )

    challenge_points = fields.Integer(
        string="Challenge Points",
        readonly=True,
    )

    total_points = fields.Integer(
        string="Total Points",
        readonly=True,
    )

    rank = fields.Integer(
        string="Rank",
        readonly=True,
    )

    @api.model_cr
    def init(self):
        tools.drop_view_if_exists(self.env.cr, self._table)
        self.env.cr.execute(
            """
            CREATE OR REPLACE VIEW %s AS
            SELECT
                ROW_NUMBER() OVER (
                    ORDER BY COALESCE(csr.total_points, 0) + COALESCE(ch.total_points, 0) DESC
                ) AS id,
                emp.id AS employee_id,
                COALESCE(csr.total_points, 0) AS csr_points,
                COALESCE(ch.total_points, 0) AS challenge_points,
                COALESCE(csr.total_points, 0) + COALESCE(ch.total_points, 0) AS total_points,
                ROW_NUMBER() OVER (
                    ORDER BY COALESCE(csr.total_points, 0) + COALESCE(ch.total_points, 0) DESC
                ) AS rank
            FROM hr_employee emp
            LEFT JOIN (
                SELECT employee_id, SUM(points_earned) AS total_points
                FROM esg_employee_participation
                WHERE approval_status = 'approved'
                GROUP BY employee_id
            ) csr ON csr.employee_id = emp.id
            LEFT JOIN (
                SELECT employee_id, SUM(points_earned) AS total_points
                FROM esg_challenge_participation
                WHERE approval_status = 'approved'
                GROUP BY employee_id
            ) ch ON ch.employee_id = emp.id
            """ % self._table
        )