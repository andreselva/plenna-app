import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export const useInvoiceManager = (periodo) => {
    const [invoices, setInvoices] = useState([
        {
            id: 1, name: 'Fatura de Janeiro', invoiceDueDate: '2023-01-31', closingDate: '2023-02-05',
            paymentDate: '2023-02-10', status: 'Paga', value: 1000,
            expenses: [
                { id: 1, name: 'Despesa 1', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 3, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 4, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 5, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 6, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 7, name: 'Despesa 1', value: 500, dueDate: '2023-01-15', },
                { id: 8, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 9, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 10, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 11, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 12, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
            ]
        },
        {
            id: 2, name: 'Fatura de Fevereiro', invoiceDueDate: '2023-02-28', closingDate: '2023-03-05',
            paymentDate: '2023-03-10', status: 'Pendente', value: 1200,
            expenses: [
                { id: 13, name: 'Despesa 4', value: 600, dueDate: '2023-02-15', },
                { id: 14, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 15, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 16, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 17, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
            ]
        }
    ]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const { data } = await axiosInstance.get("/invoices", {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                });
                setInvoices(data);
            } catch (err) {
                setError(err?.response?.data?.message || "Erro ao buscar as receitas!");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoices();
    }, [periodo]);

    return { invoices, loading, error };
}
