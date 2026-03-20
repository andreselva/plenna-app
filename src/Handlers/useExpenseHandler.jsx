import { useExpenseManager } from '../Hooks/ExpenseManager/useExpenseManager';
import { CategoryManager } from '../Hooks/CategoryManager/CategoryManager';
import { useBankAccounts } from '../Hooks/BankAccountsManager/useBankAccounts';
import { useExpenseForm } from './useExpenseForm';
import { usePaymentManager } from '../Hooks/PaymentManager/usePaymentManager';
import { useCreditCards } from '../Hooks/CreditCardsManager/useCreditCards';

export const useExpenseHandler = (periodo) => {
    const { expenses, addExpense, deleteExpense, updateExpense, loading, error, refetch } = useExpenseManager(periodo);
    const { registerPayment } = usePaymentManager();
    const { categories } = CategoryManager();
    const { accounts } = useBankAccounts();
    const { creditCards } = useCreditCards();

    const formLogic = useExpenseForm({
        addExpense,
        updateExpense,
        deleteExpense,
        registerPayment,
        categories,
        accounts,
        creditCards,
    });

    return {
        expenses,
        creditCards,
        ...formLogic,
        loading,
        error,
        refetch
    };
};