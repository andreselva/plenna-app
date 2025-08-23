import "./Dashboard.css";
import { useState, useMemo } from "react";
import { Doughnut, Line, Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useDashboardData } from "../../Hooks/DashboardManager/DashboardManager";
import { defaultGastosPorCategoriaData, gastosPorCategoriaOptions } from "./DashboardCards/GastosPorCategoria/GastosCategoriaChartOptions";
import { defaultEvolucaoMensalData, evolucaoMensalOptions } from "./DashboardCards/EvolucaoMensal/EvolucaoMensalChartOptions";
import { defaultFaturasPorCartaoData, faturasPorCartaoOptions } from "./DashboardCards/Faturas/FaturaChartOptions";
import { CustomDatePicker } from "../../Components/DatePicker/DatePicker";
import { getStartAndEndOfMonth, getFormattedDateRange } from "../../Utils/DateUtils";
import { DashboardSkeleton } from "./DashboardSkeleton";
import GastosDoughnutChart from "./DashboardCards/GastosPorCategoria/GastosDoughnutChart";
import {Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Filler} from "chart.js";
import SaldoCard from "./DashboardCards/Cards/SaldoCard";
import TopCategoryCard from "./DashboardCards/Cards/TopCategoryCard";
import UpcomingBillsCard from "./DashboardCards/Cards/UpcomingBillsCard";
import HighestBillCard from "./DashboardCards/Cards/HighestBillCard";
import FaturasChart from "./DashboardCards/Faturas/FaturaChart";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ChartDataLabels,
    Filler
);

const Dashboard = () => {
    const [formattedPeriod, setFormattedPeriod] = useState(() => getStartAndEndOfMonth());
    const { data, loading } = useDashboardData(formattedPeriod);
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        const nextMonthDate = new Date(now);
        nextMonthDate.setMonth(now.getMonth() + 1);
        return nextMonthDate;
    });
    const [selectedRange, setSelectedRange] = useState(null);
        
    const saldoData = data?.saldoData;
    const gastosPorCategoriaData = data?.gastosPorCategoriaData || defaultGastosPorCategoriaData;
    const contasVencimentoProximo = data?.contasVencimentoProximo || [];
    const evolucaoMensalData = data?.evolucaoMensal || defaultEvolucaoMensalData;
    const faturasPorCartaoData = data?.faturasPorCartao || defaultFaturasPorCartaoData;
    const maiorFatura = data?.maiorFatura;

    const topCategory = useMemo(() => {
        const gastosData = data?.gastosPorCategoriaData || defaultGastosPorCategoriaData;
        const labels = gastosData.labels || [];
        const dataValues = gastosData.datasets?.[0]?.data || [];

        if (dataValues.length === 0) {
            return { name: 'N/D', value: 0, percentage: 0 };
        }

        const totalExpenses = dataValues.reduce((sum, value) => sum + value, 0);
        
        let topCategory = { name: '', value: -1 };
        dataValues.forEach((value, index) => {
            if (value > topCategory.value) {
                topCategory = { name: labels[index], value: value };
            }
        });

        const percentage = totalExpenses > 0 ? ((topCategory.value / totalExpenses) * 100).toFixed(0) : 0;

        return { ...topCategory, percentage };

    }, [data]);

    const upcomingBills = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sevenDaysFromNow = new Date(today);
        sevenDaysFromNow.setDate(today.getDate() + 15);

        const billsDueSoon = contasVencimentoProximo.filter(conta => {
            const [year, month, day] = conta.vencimento.split('-').map(Number);
            const dueDate = new Date(year, month - 1, day);
            
            return dueDate >= today && dueDate <= sevenDaysFromNow;
        });

        const totalValue = billsDueSoon.reduce((sum, conta) => {
            const cleanedString = String(conta.valor).replace(/[^\d,]/g, '').replace(',', '.');
            const numericValue = parseFloat(cleanedString);
                return sum + (isNaN(numericValue) ? 0 : numericValue);
        }, 0);
        
        return {
            count: billsDueSoon.length,
            total: totalValue
        };
    }, [contasVencimentoProximo]);

    if (loading) {
        return <DashboardSkeleton />
    }
    
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
                <div className="row">
                    <SaldoCard saldoData={saldoData} />
                    <TopCategoryCard categoryData={topCategory} />
                    <UpcomingBillsCard billsData={upcomingBills} />
                    <HighestBillCard billData={maiorFatura} />
                </div>
                <div className="row">
                    <div className="card">
                        <span className="card-title">Evolução Mensal</span>
                        <Line
                            data={evolucaoMensalData}
                            options={evolucaoMensalOptions}
                        />
                    </div>
                    <div className="column">
                        <div className="card">
                            <span className="card-title">Gastos por Categoria</span>
                            <div className="card__content--grow chart-container chart-max-size-medium">
                                <GastosDoughnutChart
                                    data={gastosPorCategoriaData}
                                    options={gastosPorCategoriaOptions}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="card">
                        <span className="card-title">Faturas</span>
                        <FaturasChart
                            data={faturasPorCartaoData}
                            options={faturasPorCartaoOptions}
                        />
                    </div>
                    <div className="card card--grow-2">
                        <span className="card-title">Contas do mês</span>
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
                                                <td>{conta.vencimento.split('-').reverse().join('/')}</td>
                                                <td>{conta.valor}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;
