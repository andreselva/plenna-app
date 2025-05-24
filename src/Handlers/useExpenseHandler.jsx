// Hooks/useExpenseHandler.js

import { useExpenseManager } from '../Hooks/ExpenseManager/useExpenseManager';
import { CategoryManager } from '../Hooks/CategoryManager/CategoryManager';
import { useBankAccounts } from '../Hooks/BankAccountsManager/useBankAccounts';
import { useExpenseForm } from './useExpenseForm';

export const useExpenseHandler = (periodo) => {
    // const { expenses } = useExpense
    const { expenses, addExpense, deleteExpense, updateExpense } = useExpenseManager(periodo);
    const { categories } = CategoryManager();
    const { accounts } = useBankAccounts();

    const formLogic = useExpenseForm({
        addExpense,
        updateExpense,
        deleteExpense,
        categories,
        accounts
    });

    return {
        expenses,
        ...formLogic
    };
};