/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Loading extends Component {
    static template = "ecosphere.Loading";
    static props = { label: { type: String, optional: true } };
    static defaultProps = { label: "Loading..." };
}
