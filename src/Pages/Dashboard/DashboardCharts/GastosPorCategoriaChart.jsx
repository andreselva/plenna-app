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
            callbacks: {
                label: function(context) {
                    const value = context.parsed;
                    if (value === null) return '';
                    return ` ${context.label}: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`;
                }
            }
        },
        datalabels: {
            display: false, // Diz ao plugin para não mostrar nenhum rótulo
        }
    },
};
