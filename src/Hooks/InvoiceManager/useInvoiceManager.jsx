import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export const useInvoiceManager = (periodo) => {
    const [invoices, setInvoices] = useState([]);

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
