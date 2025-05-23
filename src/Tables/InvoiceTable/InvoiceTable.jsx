// import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
import React, { useState } from 'react';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import ExpandableRow from '../../Components/ExpansableRow/ExpansableRow';


const InvoiceTable = ({ onEdit, handleDelete }) => {
    const [expandedInvoiceIds, setExpandedInvoiceIds] = useState(new Set());

    // const handleDelete = DeleteConfirmation(onDelete, {
    //     confirmTitle: 'Deseja realmente excluir?',
    //     confirmText: 'A exclusão é definitiva!',
    //     confirmButtonText: 'Excluir',
    //     cancelButtonText: 'Manter',
    //     successMessage: 'Despesa excluída!',
    //     errorMessage: 'Erro ao excluir despesa!'
    // });

    const invoices = [
        {
            id: 1,
            name: 'Fatura de Janeiro',
            invoiceDueDate: '2023-01-31',
            closingDate: '2023-02-05',
            paymentDate: '2023-02-10',
            status: 'Paga',
            value: 1000,
            expenses: [
                {
                    id: 1,
                    name: 'Despesa 1',
                    value: 500,
                    dueDate: '2023-01-15',
                },
                {
                    id: 2,
                    name: 'Despesa 2',
                    value: 300,
                    dueDate: '2023-01-20',
                },
                {
                    id: 3,
                    name: 'Despesa 3',
                    value: 200,
                    dueDate: '2023-01-25',
                }
            ]
        },
        {
            id: 2,
            name: 'Fatura de Fevereiro',
            invoiceDueDate: '2023-02-28',
            closingDate: '2023-03-05',
            paymentDate: '2023-03-10',
            status: 'Pendente',
            value: 1200,
            expenses: [
                {
                    id: 4,
                    name: 'Despesa 4',
                    value: 600,
                    dueDate: '2023-02-15',
                },
                {
                    id: 5,
                    name: 'Despesa 5',
                    value: 400,
                    dueDate: '2023-02-20',
                }
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
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Vencimento</th>
                    <th>Data de fechamento</th>
                    <th>Data de pagamento</th>
                    <th>Valor total</th>
                    <th>Status</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {invoices.map((invoice) => (
                    <React.Fragment key={invoice.id}>
                        <tr onClick={() => toggleInvoice(invoice.id)} style={{ cursor: 'pointer' }}>
                            <td>{invoice.name}</td>
                            <td>{invoice.invoiceDueDate.split('-').reverse().join('/')}</td>
                            <td>{invoice.closingDate.split('-').reverse().join('/')}</td>
                            <td>{invoice.paymentDate.split('-').reverse().join('/')}</td>
                            <td>{invoice.value}</td>
                            <td>
                                <span
                                    style={{
                                        backgroundColor: invoice.status.toUpperCase() === 'PAGA' ? "rgba(0, 255, 0, 0.2)" : "rgba(255, 0, 0, 0.2)",
                                        color: "#000",
                                        fontSize: '15px',
                                        padding: "4px 8px",
                                        borderRadius: "10px",
                                        display: "inline-block",
                                    }}
                                >
                                    {invoice.status}
                                </span>
                            </td>
                            <td className={globalStyles.actions}>
                                <button className={globalStyles['action-button']} onClick={(e) => { e.stopPropagation(); onEdit(invoice) }}>Editar</button>
                                <button className={globalStyles['action-button']} onClick={(e) => { e.stopPropagation(); handleDelete(invoice) }}>Excluir</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="7" style={{ padding: 0, border: 'none' }}>
                                <ExpandableRow isOpen={expandedInvoiceIds.has(invoice.id)}>
                                    <table style={{ width: '100%', backgroundColor: '#f0f0f0' }}>
                                        <thead>
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
                            </td>
                        </tr>
                    </React.Fragment>
                ))}
            </tbody>
        </table>
    );
};

export default InvoiceTable;