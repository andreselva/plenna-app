const meses = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];

export const defaultEvolucaoMensalData = {
    labels: meses,
    datasets: [
        {
            label: "Receitas",
            data: Array(12).fill(0),
            fill: true,
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            borderColor: 'rgba(76, 175, 80, 0.8)',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
        },
        {
            label: "Despesas",
            data: Array(12).fill(0),
            fill: true,
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            borderColor: 'rgba(244, 67, 54, 0.8)',
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6,
        },
    ],
};

export const evolucaoMensalOptions = {
    plugins: {
        legend: {
            position: 'top',
            align: 'end',
            labels: {
                usePointStyle: true,
                padding: 20,
                font: {
                    size: 12
                }
            }
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false,
            }
        },
        x: {
            grid: {
                display: false
            }
        }
    }
};
