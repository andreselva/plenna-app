import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";

export const useInvoiceManager = (periodo) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: response } = await axiosInstance.get("/invoices", {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                });
                setInvoices(response.payload.invoices || []);
            } catch (err) {
                setError(err?.response?.data?.message || "Erro ao buscar as faturas!");
                setInvoices([]);
            } finally {
                setLoading(false);
            }
        };

        if (periodo && (typeof periodo === 'object' && Object.keys(periodo).length > 0)
            || (typeof periodo === 'string' && periodo.trim() !== '')) {
            fetchInvoices();
        } else {
            setInvoices([]);
            setLoading(false);
            setError(null);
        }
    }, [periodo]);

    const generateInvoices = async (infosAccount) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post("/invoices/create", infosAccount);

            if (response.status >= 200 && response.status < 300) {
                AlertToast({ icon: 'success', title: 'Faturas criadas com sucesso!' });
            } else {
                const errorMessage = response.data?.message || "Resposta inesperada do servidor.";
                AlertToast({ icon: 'error', title: errorMessage });
                setError(errorMessage);
            }
        } catch (err) {
            console.error("Erro na chamada API para gerar faturas:", err.response || err);
            const errorMessage = err.response?.data?.message || "Erro ao gerar faturas";
            AlertToast({ icon: 'error', title: errorMessage });
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return { invoices, generateInvoices, loading, error };
};