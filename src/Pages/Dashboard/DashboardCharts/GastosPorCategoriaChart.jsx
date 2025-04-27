export const defaultGastosPorCategoriaData = {
    labels: [],
    datasets: [{
        label: "Gastos",
        data: [],
        backgroundColor: [],
    }]
};

export const gastosPorCategoriaOptions = {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                drawBorder: false,
                color: 'rgba(0, 0, 0, 0.1)',
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
};
