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
import { useDashboardData } from "../../Hooks/DashboardManager/DashboardManager";

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
    const { data, loading, error } = useDashboardData();

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar dados: {error}</div>;

    const { saldoData, gastosPorCategoriaData, contasVencimentoProximo } = data;
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
