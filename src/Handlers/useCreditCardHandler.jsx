import { useState } from 'react';
import { useCreditCards } from '../Hooks/CreditCardsManager/useCreditCards';

export const useCreditCardHandler = () => {
  const {
    creditCards,
    addCreditCard,
    updateCreditCard,
    deleteCreditCard,
    loading,
    error,
  } = useCreditCards();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [newAccount, setNewAccount] = useState('');
  const [generateInvoice, setGenerateInvoice] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [closingDate, setClosingDate] = useState('');

  const resetForm = () => {
    setEditingAccount(null);
    setNewAccount('');
    setGenerateInvoice(false);
    setDueDate('');
    setClosingDate('');
  };

  const handleAddAccount = async () => {
    if (!newAccount.trim()) {
      alert('O nome do cartão não pode ser vazio.');
      return;
    }

    await addCreditCard({
      name: newAccount,
      generateInvoice,
      dueDate,
      closingDate,
    });

    resetForm();
    setIsModalOpen(false);
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setNewAccount(account.name || '');
    setGenerateInvoice(!!account.generateInvoice);
    setDueDate(account.dueDate || '');
    setClosingDate(account.closingDate || '');
    setIsModalOpen(true);
  };

  const handleSaveAccount = async () => {
    if (!newAccount.trim()) {
      alert('O nome do cartão não pode ser vazio.');
      return;
    }

    if (editingAccount) {
      await updateCreditCard(editingAccount.id, {
        name: newAccount,
        generateInvoice,
        dueDate,
        closingDate,
      });
    } else {
      await handleAddAccount();
      return;
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteAccount = async (id) => {
    await deleteCreditCard(id);
  };

  return {
    creditCards,
    newAccount,
    setNewAccount,
    isModalOpen,
    setIsModalOpen,
    editingAccount,
    setEditingAccount,
    handleEditAccount,
    handleDeleteAccount,
    handleSaveAccount,
    generateInvoice,
    setGenerateInvoice,
    dueDate,
    setDueDate,
    closingDate,
    setClosingDate,
    loading,
    error,
  };
};