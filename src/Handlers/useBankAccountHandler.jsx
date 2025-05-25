import { useState } from 'react';
import { useBankAccounts } from '../Hooks/BankAccountsManager/useBankAccounts';

export const useBankAccountHandler = () => {
    const { accounts, addBankAccount, updateBankAccount, deleteBankAccount } = useBankAccounts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [newAccount, setNewAccount] = useState('');
    const [generateInvoice, setGenerateInvoice] = useState(false);

    const handleAddAccount = () => {
        if (!newAccount.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        addBankAccount({
            name: newAccount,
            generateInvoice: generateInvoice
        });

        setNewAccount('');
        setIsModalOpen(false);
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setNewAccount(account.name);
        setGenerateInvoice(account.generateInvoice);
        setIsModalOpen(true);
    };

    const handleSaveAccount = () => {
        if (!newAccount.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        if (editingAccount) {
            updateBankAccount(editingAccount.id, {
                name: newAccount,
                generateInvoice: generateInvoice
            });
        } else {
            handleAddAccount();
        }

        setEditingAccount(null);
        setNewAccount('');
        setIsModalOpen(false);
    };

    const handleDeleteAccount = (id) => {
        deleteBankAccount(id);
    };

    return {
        accounts,
        newAccount,
        setNewAccount,
        isModalOpen,
        setIsModalOpen,
        editingAccount,
        generateInvoice,
        setGenerateInvoice,
        setEditingAccount,
        handleEditAccount,
        handleDeleteAccount,
        handleSaveAccount
    };
};
