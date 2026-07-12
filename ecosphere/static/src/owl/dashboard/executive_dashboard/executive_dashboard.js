/** @odoo-module **/

import { Component, useState, onWillStart } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { StatCard } from "../../shared/StatCard/stat_card";
import { Gauge } from "../../shared/Gauge/gauge";
import { Table } from "../../shared/Table/table";
import { Loading } from "../../shared/Loading/loading";

export class ExecutiveDashboard extends Component {
    static template = "ecosphere.ExecutiveDashboard";
    static components = { StatCard, Gauge, Table, Loading };

    setup() {
        this.rpc = useService("rpc");
        this.state = useState({
            loading: true,
            summary: null,
            departments: [],
            aiInsights: [],
            error: null,
        });

        onWillStart(async () => this.loadDashboard());
    }

    async loadDashboard() {
        this.state.loading = true;
        try {
            const [summary, departments] = await Promise.all([
                this.rpc("/ecosphere/dashboard/summary", {}),
                this.rpc("/ecosphere/dashboard/departments", {}),
            ]);
            this.state.summary = summary;
            this.state.departments = departments;
        } catch (err) {
            this.state.error = "Failed to load dashboard data.";
        } finally {
            this.state.loading = false;
        }
    }

    async loadInsightsForDepartment(dept) {
        const weakAreas = [dept.environment_score, dept.social_score, dept.governance_score]
            .map((score, i) => ({ pillar: ["environment", "social", "governance"][i], score }))
            .sort((a, b) => a.score - b.score)
            .slice(0, 2)
            .map((x) => x.pillar);

        const result = await this.rpc("/ecosphere/ai/recommendations", {
            department_name: dept.department,
            weak_areas: weakAreas,
        });
        this.state.aiInsights = result.recommendations || [];
    }

    get departmentTableColumns() {
        return [
            { key: "department", label: "Department" },
            { key: "environment_score", label: "Environment" },
            { key: "social_score", label: "Social" },
            { key: "governance_score", label: "Governance" },
            { key: "overall_score", label: "Overall" },
            { key: "grade", label: "Grade" },
        ];
    }
}

registry.category("actions").add("ecosphere.executive_dashboard", ExecutiveDashboard);
