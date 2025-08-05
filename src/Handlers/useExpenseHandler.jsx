// Hooks/useExpenseHandler.js

import { useExpenseManager } from '../Hooks/ExpenseManager/useExpenseManager';
import { CategoryManager } from '../Hooks/CategoryManager/CategoryManager';
import { useBankAccounts } from '../Hooks/BankAccountsManager/useBankAccounts';
import { useExpenseForm } from './useExpenseForm';
import { usePaymentManager } from '../Hooks/PaymentManager/usePaymentManager';

export const useExpenseHandler = (periodo) => {
    const { expenses, addExpense, deleteExpense, updateExpense, loading, error } = useExpenseManager(periodo);
    const { registerPayment } = usePaymentManager();
    const { categories } = CategoryManager();
    const { accounts } = useBankAccounts();

    const formLogic = useExpenseForm({
        addExpense,
        updateExpense,
        deleteExpense,
        registerPayment,
        categories,
        accounts,
    });

    return {
        expenses,
        ...formLogic,
        loading,
        error
    };
};