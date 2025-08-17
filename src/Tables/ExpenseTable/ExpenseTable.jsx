import { BanknoteXIcon, HandCoins, Pencil, Trash2 } from "lucide-react";
import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from "../../Utils/DarkenColor";
import { ExpenseTableSkeleton } from "./ExpenseTableSkeleton";

const STATUS_COLORS = {
    paid: '#28a745',
    partial: '#ffc107',
    pending: '#dc3545',
    cancelled: '#6c757d',
    default: '#6c757d'
};

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
            style: { flex: '1 1 25%', display: 'flex', justifyContent: 'center' }
        },
        {
            header: 'Valor',
            accessor: 'value',
            style: { flex: '1 1 5%', display: 'flex', justifyContent: 'center' }
        },
        {
            header: 'Vencimento',
            renderCell: (expense) => (
                expense.invoiceDueDate ? expense.invoiceDueDate.split('-').reverse().join('/') : '-'
            ),
            style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
        },
        {
            header: 'Categoria',
            renderCell: (expense) => {
                const category = categories.find(c => c.id === expense.idCategory);
                if (category && category.color) {
                    return (
                        <span className={globalStyles.statusBadge}
                        style={{
                            backgroundColor: `${category.color}33`,
                            color: darkenHexColor(category.color, 25),
                            padding: '4px 10px'
                        }}>
                            {category.name}
                        </span>
                    );
                }
                return category ? category.name : '-';
            },
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
        },
        {
            header: 'Cartão de crédito',
            renderCell: (expense) => {
                const creditCard = creditCards.find(cc => cc.id === expense.idCreditCard) || {};
                return creditCard.name || '-';
            },
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
        },
        {
            header: 'Status',
            renderCell: (expense) => {
                const statusMap = {
                    pending: 'Pendente',
                    paid: 'Paga',
                    partial: 'Parcial',
                    cancelled: 'Cancelada'
                };
                const baseColor = STATUS_COLORS[expense.status] || STATUS_COLORS.default;
                return (
                    <span className={globalStyles.statusBadge} style={{
                        backgroundColor: `${baseColor}33`,
                        color: darkenHexColor(baseColor, 25),
                        padding: '4px 10px'
                    }}>
                        {statusMap[expense.status] || '-'}
                    </span>
                );
            },
            style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
        },
        {
            header: 'Ações',
            renderCell: (expense) => {
                let expenseActions = [
                    {
                        icon: <Pencil size={14} />,
                        text: 'Editar',
                        handler: () => onEdit(expense)
                    },
                    {
                        icon: <Trash2 size={14}/>,
                        label: 'Excluir',
                        handler: () => handleDelete(expense)
                    }
                ];

                if (!expense.idInvoice && expense.status !== 'paid') {
                    expenseActions.push({
                        icon: <HandCoins size={14}/>,
                        label: 'Efetuar pagamento',
                        handler: () => onPayment(expense)
                    })
                }
                if (!expense.idInvoice && (expense.status === 'paid' || expense.status === 'partial')) {
                    expenseActions.push({
                        icon: <BanknoteXIcon size={14}/>,
                        label: 'Estornar pagamento',
                        handler: () => onReversePayment(expense)
                    })
                }
                return <ActionDropdown actions={expenseActions} />;
            },
            style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
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