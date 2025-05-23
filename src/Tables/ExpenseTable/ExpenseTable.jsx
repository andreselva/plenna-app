import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
import globalStyles from '../../Styles/GlobalStyles.module.css';

const ExpenseTable = ({ expenses = [], categories = [], creditCards = [], onEdit, onDelete }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Despesa excluída!',
        errorMessage: 'Erro ao excluir despesa!'
    });

    return (
        <div className={globalStyles.flexibleTable} style={{ padding: '20px'}}>
            {/* Cabeçalho da Tabela */}
            <div className={`${globalStyles.tableHeader} ${globalStyles.tableRow}`}>
                <div style={{ flex: '1 1 0%' }}>Descrição</div>
                <div style={{ flex: '1 1 0%' }}>Valor</div>
                <div style={{ flex: '1 1 0%' }}>Vencimento</div>
                <div style={{ flex: '1 1 0%' }}>Categoria</div>
                <div style={{ flex: '1 1 0%' }}>Cartão de crédito</div>
                <div style={{ flex: '1 1 120px', textAlign: 'center' }}>Ações</div>
            </div>

            {/* Corpo da Tabela */}
            <div className={globalStyles.tableBody} >
                {expenses.length > 0 ? (
                    expenses.map((expense) => {
                        const category = categories.find(c => c.id === expense.idCategory) || {};
                        const creditCard = creditCards.find(cc => cc.id === expense.idCreditCard) || {};

                        return (
                            <div key={expense.id} className={globalStyles.tableRow}>
                                <div style={{ flex: '1 1 0%' }}>{expense.name}</div>
                                <div style={{ flex: '1 1 0%' }}>{expense.value}</div>
                                <div style={{ flex: '1 1 0%' }}>{expense.invoiceDueDate.split('-').reverse().join('/')}</div>
                                <div style={{ flex: '1 1 0%' }}>
                                    <span className={globalStyles.statusBadge} style={{
                                        backgroundColor: category.color ? `${category.color}33` : 'rgba(0, 0, 0, 0.1)',
                                    }}>
                                        {category.name || 'N/A'}
                                    </span>
                                </div>
                                <div style={{ flex: '1 1 0%' }}>{creditCard.name || '-'}</div>
                                <div className={globalStyles.actions} style={{ flex: '1 1 120px', justifyContent: 'center' }}>
                                    <button className={globalStyles['action-button']} onClick={() => onEdit(expense)}>Editar</button>
                                    <button className={globalStyles['action-button']} onClick={() => handleDelete(expense)}>Excluir</button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className={globalStyles.tableRow} style={{ justifyContent: 'center', padding: '20px' }}>
                        Nenhuma despesa cadastrada
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExpenseTable;