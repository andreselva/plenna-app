import { useState } from 'react';
import { ExpenseManager } from '../../Hooks/ExpenseManager/ExpenseManager';
import { CategoryManager } from '../../Hooks/CategoryManager/CategoryManager';
import { useBankAccounts } from '../BankAccountsManager/useBankAccounts';

export const useExpenseHandler = () => {
    const { expenses, addExpense, deleteExpense, updateExpense } = ExpenseManager();
    const { categories } = CategoryManager();
    const { accounts } = useBankAccounts();

    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [newExpense, setNewExpense] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseValue, setExpenseValue] = useState('');
    const [expenseInvoiceDueDate, setExpenseInvoiceDueDate] = useState('');
    const [isModalCardOpen, setIsModalCardOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [installments, setInstallments] = useState(0);
    const [typeOfInstallment, setTypeOfInstallment] = useState('U');

    const handleAddExpense = () => {
        if (!newExpense.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        addExpense({
            name: newExpense,
            description: expenseDescription,
            value: expenseValue,
            invoiceDueDate: expenseInvoiceDueDate,
            idCategory: selectedCategory,
            idCreditCard: selectedCard,
            installments: installments,
            typeOfInstallment: typeOfInstallment
        });

        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpenseInvoiceDueDate('');
        setSelectedCategory(null);
        setIsModalOpen(false);
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setNewExpense(expense.name);
        setExpenseDescription(expense.description);
        setExpenseValue(expense.value);
        setExpenseInvoiceDueDate(expense.invoiceDueDate);
        setSelectedCategory(expense.idCategory);
        setSelectedCard(expense.idCreditCard);
        setInstallments(expense.installments);
        setTypeOfInstallment(expense.typeOfInstallment);
        setIsModalOpen(true);
    };

    const handleSaveExpense = () => {
        if (!newExpense.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        if (editingExpense) {
            updateExpense(editingExpense.id, {
                name: newExpense,
                description: expenseDescription,
                value: expenseValue,
                invoiceDueDate: expenseInvoiceDueDate,
                idCategory: selectedCategory,
                idCreditCard: selectedCard,
                installments: installments,
                typeOfInstallment: typeOfInstallment
            });
        } else {
            handleAddExpense();
        }

        setEditingExpense(null);
        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpenseInvoiceDueDate('');
        setSelectedCategory('');
        setIsModalOpen(false);
    };

    const handleDeleteExpense = (id) => {
        deleteExpense(id);
    };

    const handleAddCard = () => {
        setIsModalCardOpen(true);
    }

    return {
        expenses,
        categories,
        newExpense,
        setNewExpense,
        expenseDescription,
        setExpenseDescription,
        expenseValue,
        setExpenseValue,
        expenseInvoiceDueDate,
        setExpenseInvoiceDueDate,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        isModalCardOpen,
        setIsModalCardOpen,
        editingExpense,
        setEditingExpense,
        handleAddExpense,
        handleEditExpense,
        handleSaveExpense,
        handleDeleteExpense,
        handleAddCard,
        accounts,
        selectedCard,
        setSelectedCard,
        installments,
        setInstallments,
        typeOfInstallment,
        setTypeOfInstallment
    };
};
