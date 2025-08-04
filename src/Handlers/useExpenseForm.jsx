import { useState } from 'react';
import AlertConfirm from '../Components/Alerts/AlertConfirm';
import { validateDate } from '../Utils/DateUtils';
import SweetAlert from '../Components/Alerts/SweetAlert';
import { optionsStatus } from '../Types/status.options';

export const useExpenseForm = ({ addExpense, updateExpense, deleteExpense, registerPayment, categories, accounts }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState('');
    const [newExpense, setNewExpense] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseValue, setExpenseValue] = useState('');
    const [expenseInvoiceDueDate, setExpenseInvoiceDueDate] = useState('');
    const [isModalCardOpen, setIsModalCardOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState('');
    const [installments, setInstallments] = useState('');
    const [typeOfInstallment, setTypeOfInstallment] = useState('U');
    const [hasInstallments, setHasInstallments] = useState(false);
    const [hasSourceAccountId, setBooleanSourceAccountId] = useState(false);
    const [sourceAccountId, setSourceAccountId] = useState('');
    const [idExpense, setIdExpense] = useState(0);
    const [linkToInvoice, setLinkToInvoice] = useState(false);
    const [idInvoice, setIdInvoice] = useState('');
    const [status, setStatus] = useState('');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [paymentDate, setPaymentDate] = useState('');
    const updateInstallments = false;

    const resetForm = () => {
        setEditingExpense('');
        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpenseInvoiceDueDate('');
        setSelectedCategory('');
        setInstallments('');
        setTypeOfInstallment('U');
        setHasInstallments(false);
        setBooleanSourceAccountId(false);
        setIsModalOpen(false);
        setLinkToInvoice(false);
        setIdInvoice('');
        setStatus('pending');
        setSelectedCard('');
        setSourceAccountId('');
        setIdExpense(0);
    };

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
            idCategory: selectedCategory === '' ? 0 : selectedCategory,
            idCreditCard: selectedCard === '' ? 0 : selectedCard,
            installments: installments === '' ? 0 : installments,
            typeOfInstallment: typeOfInstallment,
            hasInstallments: hasInstallments,
            linkToInvoice: linkToInvoice,
            idInvoice: idInvoice === '' ? 0 : idInvoice,
            status: status
        });

        resetForm();
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setIdExpense(expense.id);
        setNewExpense(expense.name);
        setExpenseDescription(expense.description);
        setExpenseValue(expense.value);
        setExpenseInvoiceDueDate(expense.invoiceDueDate);
        setSelectedCategory(expense.idCategory);
        setSelectedCard(expense.idCreditCard);
        setInstallments(expense.installments);
        setTypeOfInstallment(expense.typeOfInstallment);
        setHasInstallments(expense.hasInstallments);
        setBooleanSourceAccountId(expense.sourceAccountId > 0);
        setSourceAccountId(expense.sourceAccountId);
        setLinkToInvoice(expense.linkToInvoice);
        setIdInvoice(expense.idInvoice);
        setStatus(expense.status)
        setIsModalOpen(true);
    };

    const handleSaveExpense = async () => {
        if (!newExpense.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        if (!validateDate(expenseInvoiceDueDate)) {
            SweetAlert.error("Data inválida!");
            return;
        }

        if (!editingExpense) {
            handleAddExpense();
            return;
        }

        const baseData = {
            name: newExpense,
            description: expenseDescription,
            value: expenseValue,
            invoiceDueDate: expenseInvoiceDueDate,
            idCategory: selectedCategory,
            idCreditCard: selectedCard,
            installments: installments,
            typeOfInstallment: typeOfInstallment,
            hasInstallments: hasInstallments,
            sourceAccountId: sourceAccountId,
            linkToInvoice: linkToInvoice,
            idInvoice: idInvoice,
            status: status
        };

        let updateInstallmentsFlag = updateInstallments;

        if (hasInstallments) {
            const result = await AlertConfirm({
                title: 'Despesa parcelada',
                text: 'Esta despesa possui parcelas. Deseja aplicar as alterações a todas as parcelas subsequentes?',
                icon: 'warning',
                confirmButtonText: 'Sim, alterar',
                cancelButtonText: 'Não'
            });

            updateInstallmentsFlag = result.isConfirmed;
        }

        updateExpense(editingExpense.id, {
            ...baseData,
            updateInstallments: updateInstallmentsFlag
        });

        resetForm();
    };

    const handleDeleteExpense = async (expense) => {
        if (expense.hasInstallments) {
            const result = await AlertConfirm({
                title: 'Despesa parcelada!',
                text: 'Esta despesa possui parcelas. Deseja excluir todas as parcelas?',
                icon: 'warning',
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Não'
            });

            if (result.isConfirmed) {
                deleteExpense(expense.id, true, expense.sourceAccountId);
            } else {
                deleteExpense(expense.id);
            }
        } else {
            deleteExpense(expense.id);
        }
    };

    const handleAddCard = () => {
        setIsModalCardOpen(true);
    }

    const handleRegisterPayment = (paymentData) => {
        registerPayment(paymentData);
    }

    return {
        categories, accounts, newExpense, setNewExpense, expenseDescription, setExpenseDescription, expenseValue, setExpenseValue, expenseInvoiceDueDate, setExpenseInvoiceDueDate, selectedCategory, setSelectedCategory, isModalOpen, setIsModalOpen, isModalCardOpen, setIsModalCardOpen, editingExpense, setEditingExpense, handleAddExpense, handleEditExpense, handleSaveExpense, handleDeleteExpense, handleAddCard, selectedCard, setSelectedCard, installments, setInstallments, typeOfInstallment, setTypeOfInstallment, hasInstallments, setHasInstallments, hasSourceAccountId, setBooleanSourceAccountId, idExpense, setIdExpense, linkToInvoice, setLinkToInvoice, idInvoice, setIdInvoice, status, setStatus, optionsStatus, handleRegisterPayment, isPaymentModalOpen, setIsPaymentModalOpen, paymentDate, setPaymentDate
    };
};