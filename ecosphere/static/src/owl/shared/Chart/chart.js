/** @odoo-module **/
import { Component, useRef, onMounted, onWillUpdateProps } from "@odoo/owl";

export class Chart extends Component {
    static template = "ecosphere.Chart";
    static props = {
        type: { type: String, optional: true },   // 'line' | 'bar'
        labels: Array,
        values: Array,
        color: { type: String, optional: true },
    };
    static defaultProps = { type: "line", color: "#2e7d32" };

    setup() {
        this.canvasRef = useRef("canvas");
        onMounted(() => this.draw());
        onWillUpdateProps(() => this.draw());
    }

    draw() {
        const canvas = this.canvasRef.el;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const { width, height } = canvas;
        ctx.clearRect(0, 0, width, height);

        const values = this.props.values;
        if (!values.length) return;
        const max = Math.max(...values, 1);
        const step = width / (values.length - 1 || 1);
        const barWidth = width / values.length * 0.6;

        ctx.strokeStyle = this.props.color;
        ctx.fillStyle = this.props.color;
        ctx.lineWidth = 2;

        if (this.props.type === "bar") {
            values.forEach((v, i) => {
                const barHeight = (v / max) * (height - 10);
                ctx.fillRect(i * step + step * 0.2, height - barHeight, barWidth, barHeight);
            });
        } else {
            ctx.beginPath();
            values.forEach((v, i) => {
                const x = i * step;
                const y = height - (v / max) * (height - 10);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
        }
    }
}
