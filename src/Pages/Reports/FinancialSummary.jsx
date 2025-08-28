import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import styles from './FinancialSummary.module.css';
import useReportsManager from '../../Hooks/Reports/useReportsManager';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const FinancialSummary = () => {
  const { loading, fetchDataFinancialSummary } = useReportsManager();

  const [monthsFilter, setMonthsFilter] = useState('1');
  const [typeAnalysis, setTypeAnalysis] = useState('future');

  const [labels, setLabels] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [summaryText, setSummaryText] = useState('');
  const [showReport, setShowReport] = useState(false);

  // Derivados (baseados nos dados já filtrados pelo back)
  const resultData = incomeData.map((inc, i) => inc - (expenseData[i] ?? 0));
  const totalIncome = incomeData.reduce((sum, v) => sum + (v || 0), 0);
  const totalExpense = expenseData.reduce((sum, v) => sum + (v || 0), 0);
  const netResult = totalIncome - totalExpense;

  const formatCurrency = (value) =>
    (value ?? 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const data = {
    labels,
    datasets: [
      { label: 'Receitas', data: incomeData, backgroundColor: 'rgba(119, 72, 206, 0.7)' },
      { label: 'Despesas', data: expenseData, backgroundColor: 'rgba(255, 99, 132, 0.7)' },
      { label: 'Resultado', data: resultData, backgroundColor: 'rgba(75, 192, 192, 0.7)' },
    ],
  };

  const options = { responsive: true, plugins: { legend: { position: 'top' } } };


  const handleMonthsFilterChange = (e) => {
    setMonthsFilter(e.target.value);
  };

  const handleTypeAnalysis = (e) => {
    setTypeAnalysis(e.target.value);
  }

  const handleGenerateReport = async () => {
    try {
      const { response } = await fetchDataFinancialSummary(
        monthsFilter,
        typeAnalysis
      );

      setLabels(response?.allLabels ?? []);
      setIncomeData(response?.allIncomeData ?? []);
      setExpenseData(response?.allExpenseData ?? []);
      setSummaryText(response?.summary ?? '');
      setShowReport(true);
    } catch (err) {
      console.error('Erro ao gerar relatório:', err);
      setShowReport(false);
    }
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>Resumo financeiro</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <div className={styles.analysisOptions}>
            <div className={styles.quickFilters}>
                <label htmlFor="monthsFilter">Período:</label>
                <select id="monthsFilter" value={monthsFilter} onChange={handleMonthsFilterChange}>
                  <option value="1">Mês atual</option>
                  <option value="3">3 meses</option>
                  <option value="6">6 meses</option>
                  <option value="12">12 meses</option>
                </select>
            </div>
            {monthsFilter > 1 && (
              <div className={styles.quickFilters}>
                 <label htmlFor="typeAnalysis">Análise:</label>
                 <select id="typeAnalysis" value={typeAnalysis} onChange={handleTypeAnalysis}>
                   <option value="future">Análise futura</option>
                   <option value="past">Análise passada</option>
                   <option value="future-and-past">Análise futura e passada</option>
                 </select>
              </div>
            )}
            <button
              className={styles.generateButton}
              onClick={handleGenerateReport}
              disabled={loading}
              aria-busy={loading}
            >
              {loading ? 'Gerando…' : 'Gerar relatório'}
            </button>
          </div>

          {showReport && (
            <>
              <div className={styles.aiSummary}>
                <h3>Resumo</h3>
                <p>{summaryText || '—'}</p>
              </div>

              <div className={styles.summaryCards}>
                <div className={styles.summaryCard}>
                  <span>Receitas</span>
                  <h3>{formatCurrency(totalIncome)}</h3>
                </div>
                <div className={styles.summaryCard}>
                  <span>Despesas</span>
                  <h3>{formatCurrency(totalExpense)}</h3>
                </div>
                <div className={styles.summaryCard}>
                  <span>Resultado</span>
                  <h3>{formatCurrency(netResult)}</h3>
                </div>
              </div>

              <div className={styles.chartSection}>
                <Bar data={data} options={options} />
              </div>

              <div className={styles.tableSection}>
                <table className={styles.financialTable}>
                  <thead>
                    <tr>
                      <th>Mês</th>
                      <th>Receitas</th>
                      <th>Despesas</th>
                      <th>Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labels.map((month, index) => (
                      <tr key={month}>
                        <td>{month}</td>
                        <td>{formatCurrency(incomeData[index] ?? 0)}</td>
                        <td>{formatCurrency(expenseData[index] ?? 0)}</td>
                        <td>{formatCurrency(resultData[index] ?? 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialSummary;
