import React, { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import ExpandableRow from '../../Components/ExpansableRow/ExpansableRow';

const InvoiceTable = ({ onEdit, handleDelete }) => {
    const [expandedInvoiceIds, setExpandedInvoiceIds] = useState(new Set());

    const invoices = [
        {
            id: 1, name: 'Fatura de Janeiro', invoiceDueDate: '2023-01-31', closingDate: '2023-02-05',
            paymentDate: '2023-02-10', status: 'Paga', value: 1000,
            expenses: [
                { id: 1, name: 'Despesa 1', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
            ]
        },
        {
            id: 2, name: 'Fatura de Fevereiro', invoiceDueDate: '2023-02-28', closingDate: '2023-03-05',
            paymentDate: '2023-03-10', status: 'Pendente', value: 1200,
            expenses: [
                { id: 4, name: 'Despesa 4', value: 600, dueDate: '2023-02-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
            ]
        }
    ];

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
            {/* Cabeçalho da Tabela */}
            <div className={`${globalStyles.tableHeader} ${globalStyles.tableRow}`}>
                <div style={{ flex: '2 1 0%' }}>Nome</div>
                <div style={{ flex: '1 1 0%' }}>Vencimento</div>
                <div style={{ flex: '1 1 0%' }}>Fechamento</div>
                <div style={{ flex: '1 1 0%' }}>Pagamento</div>
                <div style={{ flex: '1 1 0%' }}>Valor total</div>
                <div style={{ flex: '1 1 0%' }}>Status</div>
                <div style={{ flex: '1 1 120px', 'textAlign': 'center' }}>Ações</div>
            </div>

            {/* Corpo da Tabela */}
            <div className={globalStyles.tableBody}>
                {invoices.map((invoice) => (
                    <React.Fragment key={invoice.id}>
                        {/* Linha Clicável */}
                        <div className={globalStyles.tableRow} onClick={() => toggleInvoice(invoice.id)}>
                            <div style={{ flex: '2 1 0%' }}>{invoice.name}</div>
                            <div style={{ flex: '1 1 0%' }}>{invoice.invoiceDueDate.split('-').reverse().join('/')}</div>
                            <div style={{ flex: '1 1 0%' }}>{invoice.closingDate.split('-').reverse().join('/')}</div>
                            <div style={{ flex: '1 1 0%' }}>{invoice.paymentDate.split('-').reverse().join('/')}</div>
                            <div style={{ flex: '1 1 0%' }}>{invoice.value}</div>
                            <div style={{ flex: '1 1 0%' }}>
                                <span className={globalStyles.statusBadge} style={{
                                    backgroundColor: invoice.status.toUpperCase() === 'PAGA' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                                }}>
                                    {invoice.status}
                                </span>
                            </div>
                            <div className={globalStyles.actions} style={{ flex: '1 1 120px', justifyContent: 'center' }}>
                                <button className={globalStyles['action-button']} onClick={(e) => { e.stopPropagation(); onEdit(invoice) }}>Editar</button>
                                <button className={globalStyles['action-button']} onClick={(e) => { e.stopPropagation(); handleDelete(invoice) }}>Excluir</button>
                            </div>
                        </div>

                        {/* Linha Expansível */}
                        <div className={globalStyles.expandableContainer}>
                            <ExpandableRow isOpen={expandedInvoiceIds.has(invoice.id)}>
                                <table className={globalStyles.expensesTable} style={{ width: '100%' }}>
                                    <thead style={{ color: '#4F4F4F' }}>
                                        <tr>
                                            <th>Nome da Despesa</th>
                                            <th>Valor</th>
                                            <th>Vencimento</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoice.expenses.map((expense) => (
                                            <tr key={expense.id}>
                                                <td>{expense.name}</td>
                                                <td>{expense.value}</td>
                                                <td>{expense.dueDate.split('-').reverse().join('/')}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </ExpandableRow>
                        </div>
                    </React.Fragment>
                ))
                }
            </div >
        </div >
    );
};

export default InvoiceTable;