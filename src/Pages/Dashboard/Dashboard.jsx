import React from "react";
import './Dashboard.css';
import {Pie} from "react-chartjs-2"; // Usando react-chartjs-2 para gráficos de pizza
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const data = {
        labels: ["Alimentação", "Transporte", "Saúde", "Lazer", "Outros"],
        datasets: [
            {
                label: "Porcentagem de Gastos",
                data: [25, 20, 15, 30, 10],
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF"
                ],
                hoverOffset: 4
            }
        ]
    };

    return (
        <div className="Dashboard">
            <div className="Dashboard-content">
                {/* Card 1: Lista de contas */}
                <div className="card">
                    <h2>Contas</h2>
                    <table>
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>Conta</th>
                            <th style={{textAlign: 'center'}}>Categoria</th>
                            <th style={{textAlign: 'center'}}>Valor</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Aluguel</td>
                            <td>Moradia</td>
                            <td>R$ 1.200,00</td>
                        </tr>
                        <tr>
                            <td>Supermercado</td>
                            <td>Alimentação</td>
                            <td>R$ 600,00</td>
                        </tr>
                        <tr>
                            <td>Academia</td>
                            <td>Saúde</td>
                            <td>R$ 150,00</td>
                        </tr>
                        <tr>
                            <td>Netflix</td>
                            <td>Lazer</td>
                            <td>R$ 50,00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>


                {/* Card 2: Gráfico de pizza */}
                <div className="card">
                    <h2>Porcentagem de Gastos</h2>
                    <Pie
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                            },
                        }}
                        style={{ width: '300px', height: '300px' }} // Ajustando o tamanho do gráfico
                    />
                </div>

                {/* Card 3: Receita x Despesa */}
                <div className="card">
                    <h2>Receitas x Despesas</h2>
                    <table>
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>Receita mensal</th>
                            <th style={{textAlign: 'center'}}>Total de despesas</th>
                            <th style={{textAlign: 'center'}}>Saldo atual</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>R$ 5.000,00</td>
                            <td>R$ 5.000,00</td>
                            <td>R$ 5.000,00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                {/* Card 4: Metas Financeiras */}
                <div className="card">
                    <h2>Metas Financeiras</h2>
                    <table>
                        <thead>
                        <tr>
                            <th style={{textAlign: 'center'}}>Meta</th>
                            <th style={{textAlign: 'center'}}>Valor Alvo</th>
                            <th style={{textAlign: 'center'}}>Progresso</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>Poupar para viagem</td>
                            <td>R$ 10.000,00</td>
                            <td>R$ 3.000,00</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
