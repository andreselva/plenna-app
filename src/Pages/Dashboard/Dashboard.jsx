import "./Dashboard.css";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDashboardData } from "../../Hooks/DashboardManager/DashboardManager";
import { centerTextPlugin } from "./DashboardCharts/CenterTextPlugin";
import { defaultSaldoData, createSaldoOptions } from "./DashboardCharts/SaldoChart";
import { defaultGastosPorCategoriaData, gastosPorCategoriaOptions } from "./DashboardCharts/GastosPorCategoriaChart";
import { defaultEvolucaoMensalData, evolucaoMensalOptions } from "./DashboardCharts/EvolucaoMensalChart";
import { defaultFaturasPorCartaoData, faturasPorCartaoOptions } from "./DashboardCharts/FaturasPorCartaoChart";
import { CustomDatePicker } from "../../Components/DatePicker/DatePicker";
import { getStartAndEndOfMonth, getFormattedDateRange } from "../../Utils/DateUtils";

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
import { useState } from "react";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    centerTextPlugin,
    ChartDataLabels,
);

const Dashboard = () => {
    const [formattedPeriod, setFormattedPeriod] = useState(() => {
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        return {
            start: startOfMonth.toISOString().split("T")[0],
            end: endOfMonth.toISOString().split("T")[0],
        };
    });
    const { data, loading } = useDashboardData(formattedPeriod);
    const remainingBalance = data?.saldoRestante ?? 0;
    const saldoOptions = createSaldoOptions(remainingBalance);
    const saldoData = data?.saldoData || defaultSaldoData;
    const gastosPorCategoriaData = data?.gastosPorCategoriaData || defaultGastosPorCategoriaData;
    const contasVencimentoProximo = data?.contasVencimentoProximo || [];
    const evolucaoMensalData = data?.evolucaoMensal || defaultEvolucaoMensalData;
    const faturasPorCartaoData = data?.faturasPorCartao || defaultFaturasPorCartaoData;
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedRange, setSelectedRange] = useState(null);

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        setSelectedRange(null);

        const formattedMonthRange = getStartAndEndOfMonth(month);
        setFormattedPeriod(formattedMonthRange);
    };

    const handleDateRangeSelect = ({ startDate, endDate }) => {
        setSelectedRange({ startDate, endDate });

        const formattedRange = getFormattedDateRange(startDate, endDate);
        setFormattedPeriod(formattedRange);
    };

    return (
        <div className="Dashboard">
            <div className="Dashboard-content">
                <CustomDatePicker
                    onMonthChange={handleMonthChange}
                    onDateRangeSelect={handleDateRangeSelect}
                    selectedMonth={selectedMonth}
                    selectedRange={selectedRange}
                />
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
                            data={faturasPorCartaoData}
                            options={faturasPorCartaoOptions}
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
