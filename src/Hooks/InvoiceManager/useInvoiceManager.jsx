import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

export const useInvoiceManager = (periodo) => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            setError(null);
            try {
                const { data: response, status } = await axiosInstance.get("/invoices", {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                });

                if (response && status >= 200 && status <= 204) {
                    setInvoices(response.payload.invoices || []);
                    return;
                }
                
                throw new Error('Ocorreu um erro ao buscar as faturas!');
            } catch (err) {
                const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
                AlertToast({icon: 'error', title: errorMessage});
                setError(errorMessage);
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
            }
        } catch (err) {
            const errorMessage = defineErrorMessage(Operations.CREATE);
            AlertToast({ icon: 'error', title: errorMessage });
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const defineErrorMessage = (err, operation) => {
        if (err?.response?.data?.message) {
            return `Ocorreu um erro ao ${operation} despesa: ${err.response.data.message}.`;
        }
        return `Ocorreu um erro ao ${operation} despesa.` ;
    }

    return { invoices, generateInvoices, loading, error };
};