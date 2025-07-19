import { useState } from "react";
import { useExpensesList } from "./useExpensesList";
import { ExpenseAPI } from "./ExpenseAPI";

export const useExpenseManager = (periodo) => {
    //Usa o hook de busca para obter a lista e o controle de recarga.
    const { expenses, loading, error: fetchError, refetch } = useExpensesList(periodo);
    
    // Podemos ter um estado de erro separado para as ações de manipulação
    const [actionError, setActionError] = useState(null);

    // Define as funções de manipulação que orquestram a chamada da API e o refetch.
    const addExpense = async (expenseData) => {
        setActionError(null);
        try {
            await ExpenseAPI.addExpense(expenseData, periodo);
            await refetch();
        } catch (err) {
            setActionError(err);
        }
    };

    const deleteExpense = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        setActionError(null);
        try {
            await ExpenseAPI.deleteExpense(id, periodo, deleteInstallments, sourceAccountId);
            await refetch();
        } catch (err) {
            setActionError(err);
        }
    };

    const updateExpense = async (id, updatedExpense) => {
        setActionError(null);
        try {
            await ExpenseAPI.updateExpense(id, updatedExpense, periodo);
            await refetch();
        } catch (err) {
            setActionError(err);
        }
    };

    return { 
        expenses, 
        addExpense, 
        deleteExpense, 
        updateExpense, 
        loading, 
        error: fetchError || actionError 
    };
};