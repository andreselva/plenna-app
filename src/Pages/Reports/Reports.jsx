import { Link } from 'react-router-dom';
import globalStyles from '../../Styles/GlobalStyles.module.css';

//Mock dos dados
const reportData = [
    { id: 1, title: 'Inteligência Artificial', items: [{ name: 'Resumo Financeiro', link: 'financial-summary'}] }, //'Receita Anual'
    // { id: 2, title: 'Relatórios Manuais', items: ['Fluxo de Caixa', 'Balanço Patrimonial'] },
];

const Reports = () => {
    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <div className={globalStyles['content-title-items-left']}>
                            <span className={globalStyles['title-items-span']}>Relatórios</span>
                        </div>
                    </div>
                </div>
                <div className={globalStyles['card-reports']}>
                    <div className={globalStyles.row}>
                        {reportData.map((report) => (
                            <div key={report.id} className={globalStyles['card-r']}>
                                <div className={globalStyles['card-r-title']}>
                                    <span className={globalStyles['title-items-span-middle']}>{report.title}</span>
                                </div>
                                <div className={globalStyles['card-r-content']}>
                                    <div>
                                        <ul>
                                            {report.items.map((item, index) => (
                                                <li key={index}>
                                                    <Link to={item.link} className={globalStyles['clickableItem']}>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reports;