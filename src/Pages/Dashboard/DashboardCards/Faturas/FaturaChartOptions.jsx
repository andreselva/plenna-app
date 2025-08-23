export const defaultFaturasPorCartaoData = {
    labels: [],
    datasets: [{
        label: "Fatura",
        data: [],
        backgroundColor: [
            '#FF6B6B',
            '#4ECDC4',
            '#FED766',
            '#45B7D1',
        ],
        borderWidth: 0,
        borderRadius: 5,
        borderSkipped: false,
    }]
};

// OPÇÕES (com visual limpo)
export const faturasPorCartaoOptions = {
    indexAxis: 'y', // Mantém o gráfico na horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false
        },
        datalabels: {
            // Estilo para os números DENTRO das barras
            anchor: 'end',    // Posiciona o número no final da barra
            align: 'start',   // Alinha o texto no início do "final"
            color: '#fff',
            font: { weight: 'bold' },
            // Formata o valor para moeda, mostrando apenas se for maior que zero
            formatter: (value) => {
                const numericValue = parseFloat(value);
                return numericValue > 0 ? numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '';
            },
            padding: { left: 10 } // Um pequeno espaço da borda da barra
        },
        tooltip: {
            backgroundColor: '#2c3e50',
            titleFont: { size: 16 },
            bodyFont: { size: 14 },
            padding: 12,
            cornerRadius: 8,
            displayColors: false,
        },
    },
    scales: {
        // Remove as linhas de grade para um visual mais limpo
        x: {
            grid: { display: false },
            ticks: { display: false } // Opcional: remove os números do eixo X
        },
        y: {
            grid: { display: false }
        }
    }
};