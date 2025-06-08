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
            const { data } = await axiosInstance.get("/invoices/related", {
                params: { idBankAccount: idBankAccount } 
            });

            if (data && Array.isArray(data.invoices)) {
                setLoading(false);
                return data.invoices;
            } else if (data && Array.isArray(data)) { 
                setLoading(false);
                return data;
            }   

            setLoading(false);
            console.warn("Resposta inesperada ou sem faturas de fetchRelated:", data);
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