import { useState } from 'react';
import { RevenuesManager } from '../RevenuesManager/RevenuesManager';
import { CategoryManager } from '../CategoryManager/CategoryManager';

export const useRevenueHandler = () => {
    const { revenues, addRevenue, deleteRevenue, updateRevenue } = RevenuesManager();
    const { categories } = CategoryManager();

    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRevenue, setEditingRevenue] = useState(null);
    const [newRevenue, setNewRevenue] = useState('');
    const [revenueDescription, setRevenueDescription] = useState('');
    const [revenueValue, setRevenueValue] = useState('');
    const [revenueInvoiceDueDate, setRevenueInvoiceDueDate] = useState('');
    const [typeOfInstallment, setTypeOfInstallment] = useState('U');
    const [installments, setInstallments] = useState('');


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
            installments: installments,
            typeOfInstallment: typeOfInstallment
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
        setInstallments(revenue.installments);
        setTypeOfInstallment(revenue.typeOfInstallment);
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
                installments: installments,
                typeOfInstallment: typeOfInstallment
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
        setInstallments('');
        setTypeOfInstallment('U');
        setIsModalOpen(false);
    };

    return {
        revenues,
        categories,
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
        handleDeleteRevenue,
        typeOfInstallment,
        setTypeOfInstallment,
        installments,
        setInstallments
    };
};
