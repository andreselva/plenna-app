import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";


export const ExpenseManager = () => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchExpenses = async () => {
            if (hasFetched.current) return;

            hasFetched.current = true;
            try {
                const { data } = await axiosInstance.get("/expenses");
                setExpenses(data);
            } catch (err) {
                setError(err?.response?.data?.message || "Erro ao buscar despesas");
            } finally {
                setLoading(false);
            }
        };

        fetchExpenses();
    }, []);

    const addExpense = async (expense) => {
        try {
            const { data: newExpense } = await axiosInstance.post("/expenses", expense);

            if (Array.isArray(newExpense)) {
                setExpenses((prev) => [...prev, ...newExpense]);
            } else {
                setExpenses((prev) => [...prev, newExpense]);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao adicionar despesa!");
        }
    };

    const deleteExpense = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        try {
            const url = deleteInstallments
                ? `/expenses/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
                : `/expenses/${id}`;

            const { data } = await axiosInstance.delete(url);

            if (data.expenses) {
                setExpenses(data.expenses);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao excluir despesa!");
        }
    };

    const updateExpense = async (id, updatedExpense) => {
        try {
            const { data: updatedData } = await axiosInstance.put(`/expenses/${id}`, updatedExpense);

            if (Array.isArray(updatedData)) {
                setExpenses((prev) =>
                    prev.map((expense) =>
                        updatedData.find((updated) => updated.id === expense.id) || expense
                    )
                );
            } else {
                setExpenses((prev) =>
                    prev.map((expense) =>
                        expense.id === id ? { ...expense, ...updatedData } : expense
                    )
                );
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao atualizar despesa!");
        }
    };

    return { expenses, addExpense, deleteExpense, updateExpense, loading, error };
};
