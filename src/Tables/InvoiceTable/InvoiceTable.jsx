import React, { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import ExpandableRow from '../../Components/ExpansableRow/ExpansableRow';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import { PencilLine, Trash2Icon, FilePlus2, HandCoins, BanknoteXIcon } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import InvoiceTableSkeleton from './InvoiceTableSkeleton';
import { darkenHexColor } from '../../Utils/DarkenColor';

const STATUS_COLORS = {
    paid: '#28a745',
    parcial: '#ffc107',
    pending: '#dc3545',
    default: '#6c757d'
};

const InvoiceTable = ({ invoices, onEdit, onDelete, setIsModalOpen, onOpenPaymentModal, onReversePayment, loading, error }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Item excluído com sucesso!',
        errorMessage: 'Erro ao excluir item!'
    });

    const [expandedInvoiceIds, setExpandedInvoiceIds] = useState(new Set());

    const toggleInvoice = (invoiceId) => {
        setExpandedInvoiceIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(invoiceId)) {
                newSet.delete(invoiceId);
            } else {
                newSet.add(invoiceId);
            }
            return newSet;
        });
    };

    const getStatusText = (status) => {
        const statusMap = {
            parcial: 'Pagamento parcial',
            paid: 'Paga',
            pending: 'Pendente'
        };
        return statusMap[status] || 'N/A';
    };

    if (loading) {
        return <InvoiceTableSkeleton />;
    }

    return (
        <div className={globalStyles.flexibleTable}>
            <div className={globalStyles.tableBody}>
                {invoices && invoices.length > 0 ? (
                    invoices.map((invoice) => {
                        const invoiceActions = [];
                        if (invoice.status.toLowerCase() !== 'paid') {
                            invoiceActions.push({
                                icon: <FilePlus2 size={14} />,
                                text: 'Incluir despesa',
                                handler: () => setIsModalOpen(true),
                            });
                            invoiceActions.push({
                                icon: <HandCoins size={14} />,
                                text: 'Pagar fatura',
                                handler: () => onOpenPaymentModal(invoice),
                            });
                        }
                        if (['paid', 'parcial'].includes(invoice.status.toLowerCase())) {
                            invoiceActions.push({
                                icon: <BanknoteXIcon size={14} />,
                                text: 'Estornar Pagamento',
                                handler: () => onReversePayment(invoice)
                            });
                        }

                        const baseColor = STATUS_COLORS[invoice.status.toLowerCase()] || STATUS_COLORS.default;

                        return (
                            <React.Fragment key={invoice.id}>
                                <div className={globalStyles.tableRow} onClick={() => toggleInvoice(invoice.id)}>
                                    <div style={{ flex: '1 1 20%', justifyContent: 'center' }}>{invoice.name}</div>
                                    <div style={{ flex: '1 1 15%', justifyContent: 'center' }}>Vencimento: {invoice.dueDate.split('-').reverse().join('/')}</div>
                                    <div style={{ flex: '1 1 15%', justifyContent: 'center' }}>Fechamento: {invoice.closingDate.split('-').reverse().join('/')}</div>
                                    <div style={{ flex: '1 1 10%', justifyContent: 'center' }}>Pago: {invoice.totalPaid.toFixed(2)}</div>
                                    <div style={{ flex: '1 1 10%', justifyContent: 'center' }}>Total: {invoice.value.toFixed(2)}</div>
                                    <div style={{ flex: '1 1 15%', justifyContent: 'center' }}>
                                        <span className={globalStyles.statusBadge} style={{
                                            backgroundColor: `${baseColor}33`,
                                            color: darkenHexColor(baseColor, 25),
                                            padding: '4px 10px'
                                        }}>
                                            {getStatusText(invoice.status)}
                                        </span>
                                    </div>
                                    <div style={{ flex: '1 1 15%', justifyContent: 'center' }}>
                                        <ActionDropdown actions={invoiceActions} />
                                    </div>
                                </div>

                                {/* Linha Expansível (lógica inalterada) */}
                                <div className={globalStyles.expandableContainer} >
                                    <ExpandableRow isOpen={expandedInvoiceIds.has(invoice.id)}>
                                        <div className={globalStyles.scrollableTableWrapper}>
                                            <table className={globalStyles.expensesTable}>
                                                <thead>
                                                    <tr>
                                                        <th>Nome da Despesa</th>
                                                        <th>Valor</th>
                                                        <th>Vencimento</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {invoice.expenses && invoice.expenses.length > 0 ? (
                                                        invoice.expenses.map((expense) => (
                                                            <tr key={expense.id}>
                                                                <td>{expense.name}</td>
                                                                <td>{expense.value.toFixed(2)}</td>
                                                                <td>{expense.invoiceDueDate.split('-').reverse().join('/')}</td>
                                                                <td>
                                                                    <div className={globalStyles.actions}>
                                                                        <button
                                                                            onClick={() => { onEdit(expense) }}
                                                                            disabled={['paid', 'parcial'].includes(invoice.status.toLowerCase())}
                                                                        >
                                                                            <PencilLine width='15px' height='15px' />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => { handleDelete(expense) }}
                                                                            disabled={['paid', 'parcial'].includes(invoice.status.toLowerCase())}
                                                                        >
                                                                            <Trash2Icon width='15px' height='15px' />
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="4" style={{ textAlign: 'center', padding: '10px' }}>
                                                                Nenhuma despesa encontrada
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </ExpandableRow>
                                </div>
                            </React.Fragment>
                        )
                    })
                ) : (
                    <div className={globalStyles.tableRow} style={{ justifyContent: 'center', cursor: 'default' }}>
                        Nenhuma fatura encontrada
                    </div>
                )}
            </div >
        </div >
    );
};

export default InvoiceTable;