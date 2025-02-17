import {useState} from "react";

export const ExpenseManager = () => {
    const [expenses, setExpenses] = useState([
        {id: 1, name: 'Despesa 1', description: 'Descrição 1', value: '200,00', pay: '03/2025', categoryId: 2},
        {id: 2, name: 'Despesa 2', description: 'Descrição 2', value: '200,00', pay: '03/2025', categoryId: 2},
        {id: 3, name: 'Despesa 3', description: 'Descrição 3', value: '200,00', pay: '03/2025', categoryId: 4},
        {id: 4, name: 'Despesa 4', description: 'Descrição 4', value: '200,00', pay: '03/2025', categoryId: 4},
    ]);

    const addExpense = (expense) => {
        const newExpense = {...expense, id: Date.now()};
        setExpenses(oldExpenses => [...oldExpenses, newExpense]);
    };

    const deleteExpense = (id) => {
        setExpenses(oldExpenses => oldExpenses.filter(
            expense => expense.id !== id
        ));
    };

    const updateExpense = (id, updatedExpense) => {
        setExpenses(oldExpenses => oldExpenses.map(expense =>
            expense.id === id ? {...expense, ...updatedExpense} : expense
        ));
    };

    return {expenses, addExpense, deleteExpense, updateExpense};
};
