export const defaultGastosPorCategoriaData = {
    labels: [],
    datasets: [{
        label: "Gastos",
        data: [],
        backgroundColor: [],
    }]
};

export const gastosPorCategoriaOptions = {
    cutout: '80%',
    plugins: {
        legend: {
            display: false
        },
        tooltip: {
            backgroundColor: '#2c3e50',
            titleFont: { size: 16 },
            bodyFont: { size: 14 },
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
        },
        datalabels: {
            display: false,
        }
    },
};
