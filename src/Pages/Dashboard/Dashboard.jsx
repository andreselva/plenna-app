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

const centerTextPlugin = {
    id: 'centerText',
    beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        const text = chart.config.options.plugins.centerText?.text || '';

        ctx.save();
        ctx.font = "bold 1.4em sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#333";

        const offsetY = -17;

        ctx.fillText(text, width / 2, height / 2 + offsetY);
        ctx.restore();
    }
};

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    centerTextPlugin
);

const Dashboard = () => {
    const { data, loading } = useDashboardData();
    const remainingBalance = data?.saldoRestante ?? 0;

    const saldoData = data?.saldoData || {
        labels: ["Carregando..."],
        datasets: [{
            data: [1],
            backgroundColor: ["#ccc"],
            borderWidth: 0,
        }]
    };

    const gastosPorCategoriaData = data?.gastosPorCategoriaData || {
        labels: [],
        datasets: [{
            label: "Gastos",
            data: [],
            backgroundColor: [],
        }]
    };

    const contasVencimentoProximo = data?.contasVencimentoProximo || [];

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
            },
            centerText: {
                text: `R$ ${remainingBalance.toFixed(2)}`
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

    const meses = ["-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"];

    const evolucaoMensalData = data?.evolucaoMensal || {
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
                {loading && <div className="info-msg">Carregando dados...</div>}
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

                    <div className="card chart row-1">
                        <h2>Faturas</h2>
                        <Bar
                            data={gastosPorCategoriaData}
                            options={gastosPorCategoriaOptions}
                        />
                    </div>
                </div>

                <div className="card table">
                    <h2>Contas do mês</h2>
                    <div className="table-wrapper">
                        {contasVencimentoProximo.length === 0 ? (
                            <div className="info-msg">Nenhuma conta a vencer.</div>
                        ) : (
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
                        )}
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
