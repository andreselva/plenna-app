import { useState } from 'react';
import { useBankAccounts } from '../Hooks/BankAccountsManager/useBankAccounts';

const EMPTY_BANK_ACCOUNT = {
  name: '',
  type: 'CHECKING',
  bankCode: '',
  agency: '',
  accountNumber: '',
  initialBalance: '',
  isActive: true,
};

export const useBankAccountHandler = () => {
  const { accounts, addBankAccount, updateBankAccount, deleteBankAccount, loading, error } = useBankAccounts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [formData, setFormData] = useState(EMPTY_BANK_ACCOUNT);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditingAccount(null);
    setFormData(EMPTY_BANK_ACCOUNT);
  };

  const normalizePayload = () => ({
    name: formData.name.trim(),
    type: formData.type,
    bankCode: formData.bankCode === '' ? undefined : Number(formData.bankCode),
    agency: formData.agency?.trim() || undefined,
    accountNumber: formData.accountNumber?.trim() || undefined,
    initialBalance: formData.initialBalance === '' ? 0 : Number(formData.initialBalance),
    isActive: !!formData.isActive,
  });

  const validate = () => {
    if (!formData.name.trim()) {
      alert('O nome da conta bancária não pode ser vazio.');
      return false;
    }

    if (formData.initialBalance === '' || Number.isNaN(Number(formData.initialBalance))) {
      alert('Informe um saldo inicial válido.');
      return false;
    }

    return true;
  };

  const handleEditAccount = (account) => {
    setEditingAccount(account);
    setFormData({
      name: account.name || '',
      type: account.type || 'CHECKING',
      bankCode: account.bankCode ?? '',
      agency: account.agency || '',
      accountNumber: account.accountNumber || '',
      initialBalance: account.initialBalance ?? 0,
      isActive: account.isActive ?? true,
    });
    setIsModalOpen(true);
  };

  const handleSaveAccount = async () => {
    if (!validate()) return;

    const payload = normalizePayload();

    if (editingAccount) {
      await updateBankAccount(editingAccount.id, payload);
    } else {
      await addBankAccount(payload);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteAccount = async (id) => {
    await deleteBankAccount(id);
  };

  return {
    accounts,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingAccount,
    setEditingAccount,
    handleEditAccount,
    handleDeleteAccount,
    handleSaveAccount,
    resetForm,
    loading,
    error,
  };
};
