export const defaultSaldoData = {
    labels: ["Carregando..."],
    datasets: [{
        data: [1],
        backgroundColor: ["#ccc"],
        borderWidth: 0,
    }]
};

export const createSaldoOptions = (remainingBalance) => ({
    plugins: {
        legend: {
            position: 'bottom',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 12
                }
            }
        },
        centerText: {
            text: `R$ ${remainingBalance.toFixed(2)}`
        }
    },
    cutout: '70%',
});
