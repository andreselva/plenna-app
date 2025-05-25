import { useState } from 'react';
import { useBankAccounts } from '../Hooks/BankAccountsManager/useBankAccounts';

export const useBankAccountHandler = () => {
    const { accounts, addBankAccount, updateBankAccount, deleteBankAccount } = useBankAccounts();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [newAccount, setNewAccount] = useState('');
    const [generateInvoice, setGenerateInvoice] = useState(false);
    const [dueDate, setDueDate] = useState('');
    const [closingDate, setClosingDate] = useState('');

    const handleAddAccount = () => {
        if (!newAccount.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        addBankAccount({
            name: newAccount,
            generateInvoice: generateInvoice,
            dueDate: dueDate,
            closingDate: closingDate
        });

        setNewAccount('');
        setIsModalOpen(false);
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setNewAccount(account.name);
        setGenerateInvoice(account.generateInvoice);
        setDueDate(account.dueDate);
        setClosingDate(account.closingDate);
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
                generateInvoice: generateInvoice,
                dueDate: dueDate,
                closingDate: closingDate,
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
        setEditingAccount,
        handleEditAccount,
        handleDeleteAccount,
        handleSaveAccount,
        generateInvoice,
        setGenerateInvoice,
        dueDate,
        setDueDate,
        closingDate,
        setClosingDate
    };
};
