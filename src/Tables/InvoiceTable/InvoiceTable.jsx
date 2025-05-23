import React, { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import ExpandableRow from '../../Components/ExpansableRow/ExpansableRow';

const InvoiceTable = ({ invoices, onEdit, handleDelete }) => {
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

    return (
        <div className={globalStyles.flexibleTable}>
            {/* Corpo da Tabela */}
            <div className={globalStyles.tableBody}>
                {invoices && invoices.length > 0 ? (
                    invoices.map((invoice) => (
                        <React.Fragment key={invoice.id}>
                            {/* Linha Clicável */}
                            <div className={globalStyles.tableRow} onClick={() => toggleInvoice(invoice.id)}>
                                <div style={{ flex: '2 1 0%', fontWeight: 600 }}>{invoice.name}</div>
                                <div style={{ flex: '2 1 0%', fontWeight: 600 }}>Vencimento: {invoice.invoiceDueDate.split('-').reverse().join('/')}</div>
                                <div style={{ flex: '2 1 0%', fontWeight: 600 }}>Fechamento: {invoice.closingDate.split('-').reverse().join('/')}</div>
                                <div style={{ flex: '2 1 0%', fontWeight: 600 }}>Total: {invoice.value}</div>
                                <div style={{ flex: '2 1 0%' }}>
                                    <span className={globalStyles.statusBadge} style={{
                                        backgroundColor: invoice.status.toUpperCase() === 'PAGA' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                                        fontWeight: 600
                                    }}>
                                        Status: {invoice.status}
                                    </span>
                                </div>
                                <div className={globalStyles.actions} style={{ flex: '1 1 120px', justifyContent: 'center' }}>
                                    <button className={globalStyles['action-button']} onClick={(e) => { e.stopPropagation(); onEdit(invoice); }}>Editar</button>
                                    <button className={globalStyles['action-button']} onClick={(e) => { e.stopPropagation(); handleDelete(invoice); }}>Excluir</button>
                                </div>
                            </div>

                            {/* Linha Expansível */}
                            <div className={globalStyles.expandableContainer}>
                                <ExpandableRow isOpen={expandedInvoiceIds.has(invoice.id)}>
                                    <div className={globalStyles.scrollableTableWrapper}>
                                        <table className={globalStyles.expensesTable} style={{ width: '100%', borderRadius: '10px' }}>
                                            <thead style={{ color: '#4F4F4F' }}>
                                                <tr>
                                                    <th>Nome da Despesa</th>
                                                    <th>Valor</th>
                                                    <th>Vencimento</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {invoice.expenses && invoice.expenses.length > 0 ? (
                                                    invoice.expenses.map((expense) => (
                                                        <tr key={expense.id}>
                                                            <td>{expense.name}</td>
                                                            <td>{expense.value}</td>
                                                            <td>{expense.dueDate.split('-').reverse().join('/')}</td>
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
            </div>
        </div>
    );
};

export default InvoiceTable;