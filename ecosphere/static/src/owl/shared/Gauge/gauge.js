/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Gauge extends Component {
    static template = "ecosphere.Gauge";
    static props = {
        value: Number,
        max: { type: Number, optional: true },
        label: { type: String, optional: true },
    };
    static defaultProps = { max: 100 };

    get percent() {
        return Math.max(0, Math.min(100, (this.props.value / this.props.max) * 100));
    }
    // Semi-circle gauge: stroke-dasharray trick over a 251.2 (pi*80) circumference half
    get dashOffset() {
        const circumference = 251.2;
        return circumference - (this.percent / 100) * circumference;
    }
    get color() {
        if (this.percent >= 80) return "#2e7d32";
        if (this.percent >= 60) return "#f9a825";
        return "#c62828";
    }
}
