import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { ExpenseTableSkeleton } from "./ExpenseTableSkeleton";

const ExpenseTable = ({ expenses = [], categories = [], creditCards = [], onEdit, onDelete, onPayment, onReversePayment, loading, error }) => {
    if (loading) {
        return <ExpenseTableSkeleton />
    }

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
            style: { flex: '1 1 0%', textAlign: 'center' }
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
            header: 'Status',
            accessor: 'status',
            style: { flex: '1 1 0%', textAlign: 'center' },
            renderCell: (expense) => {
                const statusMap = {
                    pending: 'Pendente',
                    paid: 'Paga',
                    partial: 'Parcial',
                    cancelled: 'Cancelada'
                };
                return (
                    <span className={globalStyles.statusBadge} style={{
                        backgroundColor: expense.status === 'paid' ? '#28a74533' : expense.status === 'partial' ? '#ffc10733' : '#dc354533'
                    }}>
                        {statusMap[expense.status] || '-'}
                    </span>
                );
            }
        },
        {
            header: 'Ações',
            style: { flex: '1 1 50px', textAlign: 'center' },
            renderCell: (expense) => {
                let expenseActions = [
                    {
                        label: 'Editar',
                        handler: () => onEdit(expense)
                    },
                    {
                        label: 'Excluir',
                        handler: () => handleDelete(expense)
                    }
                ];

                if (!expense.idInvoice > 0 && expense.status !== 'paid') {
                    expenseActions.push({
                        label: 'Efetuar pagamento',
                        handler: () => onPayment(expense)
                    })
                }

                if (!expense.idInvoice > 0 && (expense.status === 'paid' || expense.status === 'partial')) {
                    expenseActions.push({
                        label: 'Estornar pagamento',
                        handler: () => onReversePayment(expense)
                    })
                }

                return (
                    <ActionDropdown
                        actions={expenseActions}
                    />
                );
            }
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