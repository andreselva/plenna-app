import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";

export const useExpensesList = (periodo) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get("/expenses", {
                headers: { 'X-Periodo': JSON.stringify(periodo) }
            });
            setExpenses(data);
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao buscar despesas");
        } finally {
            setLoading(false);
        }
    }, [periodo]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return { expenses, loading, error, refetch: fetchExpenses };
};