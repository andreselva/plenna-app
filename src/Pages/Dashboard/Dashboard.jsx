import React from "react";
import "./Dashboard.css";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
} from "chart.js";

// Registro dos elementos necessários
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement
);

const Dashboard = () => {
    // Gráfico 1: Saldo atual (Entradas x Saídas)
    const saldoData = {
        labels: ["Receitas", "Despesas"],
        datasets: [
            {
                data: [4000, 1500],
                backgroundColor: ["rgba(76, 175, 80, 0.8)", "rgba(244, 67, 54, 0.8)"],
                hoverBackgroundColor: ["rgba(76, 175, 80, 1)", "rgba(244, 67, 54, 1)"],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const saldoOptions = {
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
            }
        },
        cutout: '70%',
    };

    // Gráfico 2: Gastos por Categoria
    const gastosPorCategoriaData = {
        labels: ["Alimentação", "Transporte", "Moradia", "Lazer", "Saúde"],
        datasets: [
            {
                label: "Gastos por Categoria",
                data: [800, 300, 100, 150, 150],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 205, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)',
                ],
                borderWidth: 1,
                borderRadius: 5,
            },
        ],
    };

    const gastosPorCategoriaOptions = {
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

    const contasVencimentoProximo = [
        { nome: "Conta de Luz", vencimento: "15/04/2025", valor: "R$ 120,00" },
        { nome: "Internet", vencimento: "16/04/2025", valor: "R$ 80,00" },
        { nome: "Aluguel", vencimento: "20/04/2025", valor: "R$ 1.200,00" },
        { nome: "Cartão de Crédito", vencimento: "22/04/2025", valor: "R$ 500,00" },
        { nome: "Seguro do Carro", vencimento: "25/04/2025", valor: "R$ 300,00" },
        { nome: "Seguro do Carro", vencimento: "25/04/2025", valor: "R$ 300,00" },
        { nome: "Seguro do Carro", vencimento: "25/04/2025", valor: "R$ 300,00" },
        { nome: "Seguro do Carro", vencimento: "25/04/2025", valor: "R$ 300,00" },
        { nome: "Seguro do Carro", vencimento: "25/04/2025", valor: "R$ 300,00" },
        { nome: "Seguro do Carro", vencimento: "25/04/2025", valor: "R$ 300,00" },
    ];

    // Gráfico 3: Evolução Mensal
    const meses = [
        "Abr",
        "Mai",
        "Jun",
        "Jul",
        "Ago",
        "Set",
        "Out",
        "Nov",
        "Dez",
        "Jan",
        "Fev",
        "Mar",
    ];

    const evolucaoMensalData = {
        labels: meses,
        datasets: [
            {
                label: "Receitas",
                data: [2500, 2700, 2600, 3000, 2800, 3100, 3300, 3400, 3200, 3500, 3600, 4000],
                fill: true,
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                borderColor: 'rgba(76, 175, 80, 0.8)',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
            {
                label: "Despesas",
                data: [2000, 2200, 2100, 2500, 2400, 2300, 2500, 2600, 2700, 2900, 3100, 3300],
                fill: true,
                backgroundColor: 'rgba(244, 67, 54, 0.1)',
                borderColor: 'rgba(244, 67, 54, 0.8)',
                tension: 0.4,
                pointRadius: 4,
                pointHoverRadius: 6,
            },
        ],
    };

    const evolucaoMensalOptions = {
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

    return (
        <div className="Dashboard">
            <div className="Dashboard-content">
                <div className="row">
                    <div className="card chart row-1">
                        <h2>Saldo Atual</h2>
                        <Doughnut
                            data={saldoData}
                            options={saldoOptions}
                            className="small-doughnut"
                        />
                    </div>

                    <div className="card chart row-1">
                        <h2>Gastos por Categoria</h2>
                        <Bar
                            data={gastosPorCategoriaData}
                            options={gastosPorCategoriaOptions}
                        />
                    </div>

                    <div className="card chart table">
                        <h2>Contas a Vencer</h2>
                        <div className="table-wrapper">
                            <table className="contas-table">
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Vencimento</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contasVencimentoProximo.map((conta, index) => (
                                        <tr key={index}>
                                            <td>{conta.nome}</td>
                                            <td>{conta.vencimento}</td>
                                            <td>{conta.valor}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="card full-width">
                        <h2>Evolução Mensal</h2>
                        <Line
                            data={evolucaoMensalData}
                            options={evolucaoMensalOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
