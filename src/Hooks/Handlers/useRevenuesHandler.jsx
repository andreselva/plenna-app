import { useState } from 'react';
import { RevenuesManager } from '../RevenuesManager/RevenuesManager';

export const useRevenueHandler = () => {
    const { revenues, addRevenue, deleteRevenue, updateRevenue } = RevenuesManager();

    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRevenue, setEditingRevenue] = useState(null);
    const [newRevenue, setNewRevenue] = useState('');
    const [revenueDescription, setRevenueDescription] = useState('');
    const [revenueValue, setRevenueValue] = useState('');
    const [revenueInvoiceDueDate, setRevenueInvoiceDueDate] = useState('');

    const handleAddRevenue = () => {
        if (!newRevenue.trim()) {
            alert('O nome da receita não pode ser vazio.');
            return;
        }

        addRevenue({
            name: newRevenue,
            description: revenueDescription,
            value: revenueValue,
            invoiceDueDate: revenueInvoiceDueDate,
            idCategory: selectedCategory,
        });

        resetForm();
    };

    const handleEditRevenue = (revenue) => {
        setEditingRevenue(revenue);
        setNewRevenue(revenue.name);
        setRevenueDescription(revenue.description);
        setRevenueValue(revenue.value);
        setRevenueInvoiceDueDate(revenue.invoiceDueDate);
        setSelectedCategory(revenue.idCategory);
        setIsModalOpen(true);
    };

    const handleSaveRevenue = () => {
        if (!newRevenue.trim()) {
            alert('O nome da receita não pode ser vazio.');
            return;
        }

        if (editingRevenue) {
            updateRevenue(editingRevenue.id, {
                name: newRevenue,
                description: revenueDescription,
                value: revenueValue,
                invoiceDueDate: revenueInvoiceDueDate,
                idCategory: selectedCategory,
            });
        } else {
            handleAddRevenue();
            return; // já faz reset no handleAddRevenue
        }

        resetForm();
    };

    const handleDeleteRevenue = (id) => {
        deleteRevenue(id);
    };

    const resetForm = () => {
        setEditingRevenue(null);
        setNewRevenue('');
        setRevenueDescription('');
        setRevenueValue('0');
        setRevenueInvoiceDueDate('');
        setSelectedCategory(null);
        setIsModalOpen(false);
    };

    return {
        revenues,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        editingRevenue,
        setEditingRevenue,
        newRevenue,
        setNewRevenue,
        revenueDescription,
        setRevenueDescription,
        revenueValue,
        setRevenueValue,
        revenueInvoiceDueDate,
        setRevenueInvoiceDueDate,
        handleAddRevenue,
        handleEditRevenue,
        handleSaveRevenue,
        handleDeleteRevenue
    };
};
