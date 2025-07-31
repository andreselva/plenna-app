import { useCallback, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export const useRelatedInvoices = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchRelated = useCallback(async (idBankAccount) => {
        if (!idBankAccount) {
            return [];
        }
        setLoading(true);
        setError(null);
        try {
            const { data: response, status } = await axiosInstance.get(`/invoices/related/${idBankAccount}`);
            if (response && status >= 200 && status <= 204 ) {
                setLoading(false);
                return response.payload.invoices;
            }
            setLoading(false);
            console.warn("Resposta inesperada ou sem faturas de fetchRelated:", response);
            return [];
        } catch (err) {
            console.error("Erro ao buscar faturas relacionadas (useRelatedInvoices):", err);
            setError(err?.response?.data?.message || "Erro ao buscar faturas relacionadas");
            setLoading(false);
            return [];
        }
    }, []); 

    return { fetchRelated, loading, error };
};