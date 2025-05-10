import { useState } from 'react';
import { RevenuesManager } from '../RevenuesManager/RevenuesManager';
import { CategoryManager } from '../CategoryManager/CategoryManager';
import AlertConfirm from '../../Components/Alerts/AlertConfirm';

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
    const [hasInstallments, setHasInstallments] = useState(false);
    const [hasSourceAccountId, setBooleanSourceAccountId] = useState(false);
    const [sourceAccountId, setSourceAccountId] = useState('');
    const updateInstallments = false;


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
            typeOfInstallment: typeOfInstallment,
            hasInstallments: hasInstallments
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
        setTypeOfInstallment(revenue.typeOfInstallments);
        setHasInstallments(revenue.hasInstallments);
        setBooleanSourceAccountId(revenue.sourceAccountId > 0);
        setSourceAccountId(revenue.sourceAccountId);
        setIsModalOpen(true);
    };

    const handleSaveRevenue = async () => {
        if (!newRevenue.trim()) {
            alert('O nome da receita não pode ser vazio.');
            return;
        }

        if (!editingRevenue) {
            handleAddRevenue();
            resetForm();
            return;
        }

        const baseData = {
            name: newRevenue,
            description: revenueDescription,
            value: revenueValue,
            invoiceDueDate: revenueInvoiceDueDate,
            idCategory: selectedCategory,
            installments: installments,
            typeOfInstallment: typeOfInstallment,
            hasInstallments: hasInstallments,
            sourceAccountId: sourceAccountId
        };

        let updateInstallmentsFlag = updateInstallments;

        if (hasInstallments) {
            const result = await AlertConfirm({
                title: 'Receita parcelada',
                text: 'Esta receita possui parcelas. Deseja aplicar as alterações a todas as parcelas subsequentes?',
                icon: 'warning',
                confirmButtonText: 'Sim, alterar',
                cancelButtonText: 'Não'
            });

            updateInstallmentsFlag = result.isConfirmed;
        }

        updateRevenue(editingRevenue.id, {
            ...baseData,
            updateInstallments: updateInstallmentsFlag
        });

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
        setHasInstallments(false);
        setBooleanSourceAccountId(false);
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
        setInstallments,
        hasInstallments,
        setHasInstallments,
        hasSourceAccountId,
        setBooleanSourceAccountId
    };
};
