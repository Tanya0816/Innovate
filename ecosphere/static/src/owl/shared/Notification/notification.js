/** @odoo-module **/
import { Component, useState, onWillStart, onMounted, onWillUnmount } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

export class NotificationBell extends Component {
    static template = "ecosphere.NotificationBell";

    setup() {
        this.rpc = useService("rpc");
        this.busService = useService("bus_service");
        this.state = useState({ open: false, items: [] });

        onWillStart(async () => this.loadNotifications());
        onMounted(() => {
            this.busService.subscribe("ecosphere.notification", this.onBusNotification.bind(this));
            this.busService.addChannel(`res.partner_${this.env.services.user?.partnerId}`);
        });
        onWillUnmount(() => {
            this.busService.unsubscribe("ecosphere.notification", this.onBusNotification.bind(this));
        });
    }

    async loadNotifications() {
        const items = await this.rpc("/ecosphere/dashboard/notifications", {});
        this.state.items = items;
    }

    onBusNotification(payload) {
        this.state.items.unshift(payload);
    }

    toggle() {
        this.state.open = !this.state.open;
    }

    async markAllRead() {
        await this.rpc("/ecosphere/dashboard/notifications/mark_read", {});
        this.state.items = [];
    }

    get unreadCount() {
        return this.state.items.length;
    }
}
