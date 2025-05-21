import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

export const ExpenseManager = (periodo = {}) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const { data } = await axiosInstance.get("/expenses", {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                });
                setExpenses(data);
            } catch (err) {
                setError(err?.response?.data?.message || "Erro ao buscar despesas");
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, [periodo]);

    const addExpense = async (expense) => {
        try {
            const { data } = await axiosInstance.post("/expenses", expense, {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });
            setExpenses(data.expenses);
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao adicionar despesa!");
        }
    };

    const deleteExpense = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        try {
            const url = deleteInstallments
                ? `/expenses/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
                : `/expenses/${id}`;

            const { data } = await axiosInstance.delete(url, {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });
            setExpenses(data.expenses);
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao excluir despesa!");
        }
    };

    const updateExpense = async (id, updatedExpense) => {
        try {
            const { data } = await axiosInstance.put(`/expenses/${id}`, updatedExpense, {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });
            setExpenses(data.expenses);
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao atualizar despesa!");
        }
    };

    return { expenses, addExpense, deleteExpense, updateExpense, loading, error };
};
