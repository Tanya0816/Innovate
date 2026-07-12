/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Button extends Component {
    static template = "ecosphere.Button";
    static props = {
        label: String,
        variant: { type: String, optional: true },
        disabled: { type: Boolean, optional: true },
        onClick: { type: Function, optional: true },
    };
    static defaultProps = { variant: "primary", disabled: false };

    onClick(ev) {
        if (this.props.onClick && !this.props.disabled) this.props.onClick(ev);
    }
}
