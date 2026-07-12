/** @odoo-module **/
import { Component } from "@odoo/owl";

export class ProgressBar extends Component {
    static template = "ecosphere.ProgressBar";
    static props = {
        value: Number,
        max: { type: Number, optional: true },
        label: { type: String, optional: true },
    };
    static defaultProps = { max: 100 };

    get percent() {
        return Math.max(0, Math.min(100, (this.props.value / this.props.max) * 100));
    }
}
