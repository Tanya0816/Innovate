/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Badge extends Component {
    static template = "ecosphere.Badge";
    static props = {
        label: String,
        tone: { type: String, optional: true },
        icon: { type: String, optional: true },
    };
    static defaultProps = { tone: "neutral" };
}
