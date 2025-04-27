export const defaultFaturasPorCartaoData = {
    labels: [],
    datasets: [{
        label: "Fatura",
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
    }]
};

export const faturasPorCartaoOptions = {
    indexAxis: 'y',
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
        x: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.1)',
                drawBorder: false,
            }
        },
        y: {
            grid: {
                display: false
            }
        }
    }
};
