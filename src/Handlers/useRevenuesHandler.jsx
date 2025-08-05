import {useState} from 'react';
import { RevenuesManager } from '../Hooks/RevenuesManager/RevenuesManager';
import { CategoryManager } from '../Hooks/CategoryManager/CategoryManager';
import { validateDate } from '../Utils/DateUtils';
import SweetAlert from '../Components/Alerts/SweetAlert';
import AlertConfirm from '../Components/Alerts/AlertConfirm';

export const useRevenueHandler = (periodo) => {
    const {revenues, addRevenue, deleteRevenue, updateRevenue, loading, error} = RevenuesManager(periodo);
    const {categories} = CategoryManager();

    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRevenue, setEditingRevenue] = useState('');
    const [newRevenue, setNewRevenue] = useState('');
    const [revenueDescription, setRevenueDescription] = useState('');
    const [revenueValue, setRevenueValue] = useState('');
    const [revenueInvoiceDueDate, setRevenueInvoiceDueDate] = useState('');
    const [typeOfInstallment, setTypeOfInstallment] = useState('U');
    const [installments, setInstallments] = useState('');
    const [hasInstallments, setHasInstallments] = useState(false);
    const [hasSourceAccountId, setBooleanSourceAccountId] = useState(false);
    const [sourceAccountId, setSourceAccountId] = useState('');
    const [idRevenue, setIdRevenue] = useState(0);
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
            typeOfInstallments: typeOfInstallment,
            hasInstallments: hasInstallments
        });

        resetForm();
    };

    const handleEditRevenue = (revenue) => {
        setEditingRevenue(revenue);
        setIdRevenue(revenue.id);
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

        if (!validateDate(revenueInvoiceDueDate)) {
            SweetAlert.error("Data inválida!");
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
            typeOfInstallments: typeOfInstallment,
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

    const handleDeleteRevenue = async (revenue) => {
        if (revenue.hasInstallments) {
            const result = await AlertConfirm({
                title: 'Receita parcelada!',
                text: 'Esta receita possui parcelas. Deseja excluir todas as parcelas?',
                icon: 'warning',
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Não'
            })

            if (result.isConfirmed) {
                deleteRevenue(revenue.id, true, revenue.sourceAccountId);
            } else {
                deleteRevenue(revenue.id)
            }
        } else {
            deleteRevenue(revenue.id);
        }

    };

    const resetForm = () => {
        setEditingRevenue('');
        setNewRevenue('');
        setRevenueDescription('');
        setRevenueValue('0');
        setRevenueInvoiceDueDate('');
        setSelectedCategory('');
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
        setBooleanSourceAccountId,
        idRevenue,
        setIdRevenue,
        loading,
        error
    };
};
