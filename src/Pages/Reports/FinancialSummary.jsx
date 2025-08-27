import globalStyles from '../../Styles/GlobalStyles.module.css';

const FinancialSummary = () => {
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

                </div>
            </div>
        </div>
    )
}

export default FinancialSummary;