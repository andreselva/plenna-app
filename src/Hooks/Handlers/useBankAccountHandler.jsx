import { useState } from 'react';

export const useBankAccountHandler = () => {
    const accounts = [{ 'name': 'Sicredi' }, { 'name': 'Bradesco' }, { 'name': 'Itaú' }, { 'name': 'Santander' }, { 'name': 'Caixa Econômica Federal' }, { 'name': 'Banco do Brasil' }, { 'name': 'Banrisul' }, { 'name': 'Sicoob' }, { 'name': 'Banco Inter' }, { 'name': 'Nubank' }];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAccount, setEditingAccount] = useState(null);
    const [newAccount, setNewAccount] = useState('');

    const handleAddAccount = () => {
        if (!newAccount.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        // addAccount({
        //     name: newAccount,
        // });

        setNewAccount('');
        setIsModalOpen(false);
    };

    const handleEditAccount = (account) => {
        setEditingAccount(account);
        setNewAccount(account.name);
        setIsModalOpen(true);
    };

    const handleSaveAccount = () => {
        if (!newAccount.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        if (editingAccount) {
            // updateAccount(editingAccount.id, {
            //     name: newAccount,
            // });
        } else {
            handleAddAccount();
        }

        setEditingAccount(null);
        setNewAccount('');
        setIsModalOpen(false);
    };

    const handleDeleteAccount = (id) => {
        // deleteAccount(id);
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
        handleSaveAccount
    };
};
