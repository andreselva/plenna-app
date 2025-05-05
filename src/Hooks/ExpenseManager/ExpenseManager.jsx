import { useEffect, useRef, useState } from "react";
const apiUrl = "http://localhost:8000/expenses";

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
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Erro ao buscar receitas");
                }

                const data = await response.json();
                setExpenses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchExpenses();
    }, [])

    const addExpense = async (expense) => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expense),
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar nova despesa!");
            }

            const newExpense = await response.json();

            if (newExpense.length > 1) {
                newExpense.forEach(expense => {
                    setExpenses(oldExpenses => [...oldExpenses, expense]);
                })
            } else {
                setExpenses(oldExpenses => [...oldExpenses, newExpense]);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    const deleteExpense = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar categoria");
        }
        setExpenses(oldExpenses => oldExpenses.filter(
            expense => expense.id !== id
        ));
    };

    const updateExpense = async (id, updatedExpense) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedExpense),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar categoria!");
            }

            const updatedData = await response.json();
            setExpenses(prev =>
                prev.map(expense => expense.id === id ? { ...expense, ...updatedData } : expense)
            );
        } catch (err) {
            setError(err);
        }
    }

    return { expenses, addExpense, deleteExpense, updateExpense, loading, error };
}