import React from "react";
import "./Dashboard.css";
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
} from "chart.js";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

const Dashboard = () => {
    // Gráfico 1: Saldo atual (Entradas x Saídas)
    const saldoData = {
        labels: ["Receitas", "Despesas"],
        datasets: [
            {
                data: [4000, 1500],
                backgroundColor: ["#4caf50", "#f44336"],
                hoverOffset: 10,
            },
        ],
    };

    // Gráfico 2: Gastos por Categoria
    const gastosPorCategoriaData = {
        labels: ["Alimentação", "Transporte", "Moradia", "Lazer", "Saúde"],
        datasets: [
            {
                data: [800, 300, 100, 150, 150],
                backgroundColor: [
                    "#ff6384",
                    "#36a2eb",
                    "#ffcd56",
                    "#4bc0c0",
                    "#9966ff",
                ],
                hoverOffset: 10,
            },
        ],
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
                fill: false,
                borderColor: "#4caf50",
                tension: 0.2,
            },
            {
                label: "Despesas",
                data: [2000, 2200, 2100, 2500, 2400, 2300, 2500, 2600, 2700, 2900, 3100, 3300],
                fill: false,
                borderColor: "#f44336",
                tension: 0.2,
            },
        ],
    };

    // Mock dos dados das contas com vencimento mais próximo
    const contasVencimentoProximo = [
        { nome: "Conta de Luz", vencimento: "15/04/2025", valor: "R$ 120,00" },
        { nome: "Internet", vencimento: "16/04/2025", valor: "R$ 80,00" },
        { nome: "Aluguel", vencimento: "20/04/2025", valor: "R$ 1.200,00" },
        { nome: "Cartão de Crédito", vencimento: "22/04/2025", valor: "R$ 500,00" },
        { nome: "Seguro do Carro", vencimento: "25/04/2025", valor: "R$ 300,00" },
    ];

    return (
        <div className="Dashboard">
            <div className="Dashboard-content">
                <div className="row">
                    <div className="card chart">
                        <h2>Saldo Atual</h2>
                        <Doughnut data={saldoData} />
                    </div>

                    <div className="card chart">
                        <h2>Gastos por Categoria</h2>
                        <Doughnut data={gastosPorCategoriaData} />
                    </div>
                    <div className="card chart">
                    <h2>Contas a Vencer</h2>
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

                <div className="row">
                    <div className="card full-width">
                        <h2>Evolução Mensal</h2>
                        <Line data={evolucaoMensalData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
