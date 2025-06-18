import React, { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import ExpandableRow from '../../Components/ExpansableRow/ExpansableRow';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import { PencilLine, Trash2Icon } from 'lucide-react';

const InvoiceTable = ({ invoices, onEdit, onDelete, setIsModalOpen }) => {
    const handleDelete = DeleteConfirmation(onDelete, {
        confirmTitle: 'Deseja realmente excluir?',
        confirmText: 'A exclusão é definitiva!',
        confirmButtonText: 'Excluir',
        cancelButtonText: 'Manter',
        successMessage: 'Categoria excluída!',
        errorMessage: 'Falha ao remover categoria!'
    });

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
        const possibleStatus = ['pending', 'paid', 'partial'];
        if (possibleStatus.includes(status)) {
            switch (status) {
                case 'partial':
                    return 'Pagamento parcial'
                case 'paid':
                    return 'Paga'
                default:
                    return 'Pendente'
            }
        }

        return 'Pendente*';
    }

    return (
        <div className={globalStyles.flexibleTable}>
            {/* Corpo da Tabela */}
            <div className={globalStyles.tableBody}>
                {invoices && invoices.length > 0 ? (
                    invoices.map((invoice) => (
                        <React.Fragment key={invoice.id}>
                            {/* Linha Clicável */}
                            <div style={{ padding: '25px 0 25px 0' }} className={globalStyles.tableRow} onClick={() => toggleInvoice(invoice.id)}>
                                <div style={{ flex: '2 1 0%', fontWeight: 400 }}>{invoice.name}</div>
                                <div style={{ flex: '2 1 0%', fontWeight: 400 }}>Vencimento: {invoice.dueDate.split('-').reverse().join('/')}</div>
                                <div style={{ flex: '2 1 0%', fontWeight: 400 }}>Fechamento: {invoice.closingDate.split('-').reverse().join('/')}</div>
                                <div style={{ flex: '1 1 0%', fontWeight: 400 }}>Total (R$): {invoice.value}</div>
                                <div style={{ flex: '2 1 0%' }}>
                                    <span className={globalStyles.statusBadge} style={{
                                        backgroundColor: invoice.status.toUpperCase() === 'PAGA' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                                        fontWeight: 400
                                    }}>
                                        Status: {defineStatus(invoice.status)}
                                    </span>
                                </div>
                                <div style={{ flex: '1 0 0%' }}>
                                    {invoice.status.toUpperCase() !== 'PAGA' ? (
                                        <div className={globalStyles.actions} >
                                            <button onClick={(e) => { e.stopPropagation(); setIsModalOpen(true) }}>
                                                Incluir despesa
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={globalStyles.disabled} >
                                            <button
                                                onClick={(e) => e.stopPropagation()}
                                                disabled={true}
                                            >
                                                Incluir despesa
                                            </button>
                                        </div>
                                    )}
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
                                                                    <button onClick={() => { onEdit(expense) }}>
                                                                        <PencilLine width='15px' height='15px' />
                                                                    </button>
                                                                    <button onClick={() => { handleDelete(expense.id) }}>
                                                                        <Trash2Icon width='15px' height='15px' />
                                                                    </button>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3" style={{ textAlign: 'center', padding: '10px' }}>
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
                    ))
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