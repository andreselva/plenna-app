import { useEffect, useState, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";

/**
 * Método responsável por fazer a listagem das despesas.
 * @param {*} periodo 
 * @returns 
 */
export const useExpensesList = (periodo) => {   
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchExpenses = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const { data: response, status } = await axiosInstance.get("/expenses", {
                headers: { 'X-Periodo': JSON.stringify(periodo) }
            });

            if (response && status >= 200 && status <= 204) {
                setExpenses(response.payload.expenses);
                return;
            }
            throw new Error('Ocorreu um erro ao buscar as despesas.');
        } catch (err) {
            const errorMessage = err?.response?.data?.message ? `Ocorreu um erro ao buscar as despesas: ${err.response.data.message}.` : `Ocorreu um erro ao buscar as despesas.`;
            AlertToast({ icon: 'error', title: errorMessage });
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [periodo]);

    useEffect(() => {
        fetchExpenses();
    }, [fetchExpenses]);

    return { expenses, loading, error, refetch: fetchExpenses };
};