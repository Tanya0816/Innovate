/** @odoo-module **/
import { Component } from "@odoo/owl";

export class Table extends Component {
    static template = "ecosphere.Table";
    static props = {
        columns: Array,   // [{ key, label }]
        rows: Array,      // [{ key: value, ... }]
        onRowClick: { type: Function, optional: true },
    };

    onRowClick(row) {
        if (this.props.onRowClick) this.props.onRowClick(row);
    }
}
