import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
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

    const columns = [
        {
            header: 'Descrição',
            accessor: 'name',
            style: { flex: '1 1 0%' }
        },
        {
            header: 'Valor',
            accessor: 'value',
            style: { flex: '1 1 0%', textAlign: 'right' } // Alinhando valor à direita como exemplo
        },
        {
            header: 'Vencimento',
            style: { flex: '1 1 0%' },
            renderCell: (expense) => expense.invoiceDueDate.split('-').reverse().join('/')
        },
        {
            header: 'Categoria',
            style: { flex: '1 1 0%' },
            renderCell: (expense) => {
                const category = categories.find(c => c.id === expense.idCategory) || {};
                return (
                    <span className={globalStyles.statusBadge} style={{
                        backgroundColor: category.color ? `${category.color}33` : 'rgba(0, 0, 0, 0.1)',
                    }}>
                        {category.name || 'N/A'}
                    </span>
                );
            }
        },
        {
            header: 'Cartão de crédito',
            style: { flex: '1 1 0%' },
            renderCell: (expense) => {
                const creditCard = creditCards.find(cc => cc.id === expense.idCreditCard) || {};
                return creditCard.name || '-';
            }
        },
        {
            header: 'Ações',
            style: { flex: '1 1 120px' },
            renderCell: (expense) => (
                <div className={globalStyles.actions}>
                    <button className={globalStyles['action-button']} onClick={() => onEdit(expense)}>Editar</button>
                    <button className={globalStyles['action-button']} onClick={() => handleDelete(expense)}>Excluir</button>
                </div>
            )
        }
    ];

    return (
        <FlexibleTable
            columns={columns}
            data={expenses}
            noDataMessage="Nenhuma despesa cadastrada"
        />
    );
};

export default ExpenseTable;