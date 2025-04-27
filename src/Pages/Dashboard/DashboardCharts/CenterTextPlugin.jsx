export const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        const text = chart.config.options.plugins.centerText?.text || '';

        ctx.save();
        ctx.font = "bold 1.4em sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#333";

        const offsetY = -17;
        ctx.fillText(text, width / 2, height / 2 + offsetY);
        ctx.restore();
    }
};
