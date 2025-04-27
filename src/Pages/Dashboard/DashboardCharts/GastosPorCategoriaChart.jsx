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
        },
        datalabels: {
            anchor: 'center',
            align: 'center',
            color: '#fff',
            font: {
                weight: 'bold',
                size: 12
            },
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
