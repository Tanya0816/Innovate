/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Card extends Component {
    static template = "ecosphere.Card";
    static props = {
        title: { type: String, optional: true },
        slots: { type: Object, optional: true },
    };
}
