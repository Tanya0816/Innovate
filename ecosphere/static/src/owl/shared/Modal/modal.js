/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Modal extends Component {
    static template = "ecosphere.Modal";
    static props = {
        title: { type: String, optional: true },
        onClose: { type: Function, optional: true },
    };

    close() {
        if (this.props.onClose) this.props.onClose();
    }
}
