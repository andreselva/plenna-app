import React, { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import ExpandableRow from '../../Components/ExpansableRow/ExpansableRow';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import { PencilLine, Trash2Icon } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';

const InvoiceTable = ({ invoices, onEdit, onDelete, setIsModalOpen, onOpenPaymentModal, onReversePayment }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Item excluído com sucesso!',
        errorMessage: 'Erro ao excluir item!'
    });
    const possibleStatus = ['pending', 'paid', 'parcial'];

    const [expandedInvoiceIds, setExpandedInvoiceIds] = useState(new Set());

    const toggleInvoice = (invoiceId) => {
        setExpandedInvoiceIds((prevExpandedInvoiceIds) => {
            const newExpandedInvoiceIds = new Set(prevExpandedInvoiceIds);
            if (newExpandedInvoiceIds.has(invoiceId)) {
                newExpandedInvoiceIds.delete(invoiceId);
            } else {
                newExpandedInvoiceIds.add(invoiceId);
            }
            return newExpandedInvoiceIds;
        });
    };

    const defineStatus = (status) => {
        if (possibleStatus.includes(status)) {
            switch (status) {
                case 'parcial':
                    return 'Pagamento parcial'
                case 'paid':
                    return 'Paga'
                default:
                    return 'Pendente'
            }
        }
        return 'N/A';
    }

    return (
        <div className={globalStyles.flexibleTable}>
            <div className={globalStyles.tableBody}>
                {invoices && invoices.length > 0 ? (
                    invoices.map((invoice) => {
                        const invoiceActions = [];

                        if (invoice.status.toUpperCase() !== 'PAID') {
                            invoiceActions.push({
                                label: 'Incluir despesa',
                                handler: () => setIsModalOpen(true),
                            });
                            invoiceActions.push({
                                label: 'Pagar fatura',
                                handler: () => onOpenPaymentModal(invoice),
                            });
                        }

                        if (invoice.status.toUpperCase() === 'PAID' || invoice.status.toUpperCase() === 'PARCIAL') {
                            invoiceActions.push({
                                label: 'Estornar Pagamento',
                                handler: () => onReversePayment(invoice)
                            })
                        }


                        return (
                            <React.Fragment key={invoice.id}>
                                {/* Linha Clicável */}
                                <div style={{ padding: '25px 0 25px 0' }} className={globalStyles.tableRow} onClick={() => toggleInvoice(invoice.id)}>
                                    <div style={{ flex: '1 1 0%', fontWeight: 400 }}>{invoice.name}</div>
                                    <div style={{ flex: '2 1 0%', fontWeight: 400 }}>Vencimento: {invoice.dueDate.split('-').reverse().join('/')}</div>
                                    <div style={{ flex: '2 1 0%', fontWeight: 400 }}>Fechamento: {invoice.closingDate.split('-').reverse().join('/')}</div>
                                    <div style={{ flex: '1 1 0%', fontWeight: 400 }}>Pago: {invoice.totalPaid.toFixed(2)}</div>
                                    <div style={{ flex: '1 1 0%', fontWeight: 400 }}>Total: {invoice.value.toFixed(2)}</div>
                                    <div style={{ flex: '2 1 0%' }}>
                                        <span className={globalStyles.statusBadge} style={{
                                            backgroundColor: invoice.status.toUpperCase() === 'PAID' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                                            fontWeight: 400
                                        }}>
                                            Status: {defineStatus(invoice.status)}
                                        </span>
                                    </div>
                                    <div style={{ flex: '1 0 0%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <ActionDropdown actions={invoiceActions} />
                                    </div>
                                </div>

                                {/* Linha Expansível */}
                                <div className={globalStyles.expandableContainer} >
                                    <ExpandableRow isOpen={expandedInvoiceIds.has(invoice.id)}>
                                        <div className={globalStyles.scrollableTableWrapper}>
                                            <table className={globalStyles.expensesTable} style={{ width: '100%', borderRadius: '10px' }}>
                                                <thead style={{ color: '#4F4F4F' }}>
                                                    <tr>
                                                        <th>Nome da Despesa</th>
                                                        <th>Valor</th>
                                                        <th>Vencimento</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody >
                                                    {invoice.expenses && invoice.expenses.length > 0 ? (
                                                        invoice.expenses.map((expense) => (
                                                            <tr key={expense.id}>
                                                                <td>{expense.name}</td>
                                                                <td>{expense.value}</td>
                                                                <td>{expense.invoiceDueDate.split('-').reverse().join('/')}</td>
                                                                <td>
                                                                    <div className={globalStyles.actions} style={{ display: 'flex' }}>
                                                                        <button
                                                                            onClick={() => { onEdit(expense) }}
                                                                            disabled={ // Ações na despesa individual continuam com a lógica original
                                                                                invoice.status.toUpperCase().includes('PAID') ||
                                                                                invoice.status.toUpperCase().includes('PARCIAL')
                                                                            }>
                                                                            <PencilLine width='15px' height='15px' />
                                                                        </button>
                                                                        <button
                                                                            onClick={() => { handleDelete(expense) }}
                                                                            disabled={
                                                                                invoice.status.toUpperCase().includes('PAID') ||
                                                                                invoice.status.toUpperCase().includes('PARCIAL')
                                                                            }>
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