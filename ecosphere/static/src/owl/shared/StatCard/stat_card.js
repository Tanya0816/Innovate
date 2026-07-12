/** @odoo-module **/
import { Component } from "@odoo/owl";

export class StatCard extends Component {
    static template = "ecosphere.StatCard";
    static props = {
        label: String,
        value: { type: [Number, String], optional: true },
        badge: { type: String, optional: true },
        tone: { type: String, optional: true },
    };
    static defaultProps = { tone: "primary", value: "-" };
}
