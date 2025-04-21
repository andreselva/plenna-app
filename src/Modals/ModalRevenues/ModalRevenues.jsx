import GenericModal from '../../Components/GenericModal/GenericModal';

const ModalRevenues = ({
    setIsModalOpen,
    handleAddRevenue,
    newRevenue,
    setNewRevenue,
    revenueValue,
    setRevenueValue,
    revenueInvoiceDueDate,
    setRevenueInvoiceDueDate,
    categories,
    selectedCategory,   
    setSelectedCategory,
    setEditingRevenue
}) => {
    const handleCancel = () => {
        setNewRevenue('');
        setRevenueValue('');
        setRevenueInvoiceDueDate('');
        setSelectedCategory('');
        setEditingRevenue(null);
        setIsModalOpen(false);
    };

    const formFields = [
        {
            id: 'revenueName',
            label: 'Nome',
            type: 'text',
            value: newRevenue,
            onChange: setNewRevenue,
            placeholder: 'Ex: Salário, Freelancer...',
            required: true,
        },
        {
            id: 'revenueValue',
            label: 'Valor (R$)',
            type: 'number',
            value: revenueValue,
            onChange: setRevenueValue,
            placeholder: '0,00',
            step: '0.01',
            required: true,
        },
        {
            id: 'invoiceDueDate',
            label: 'Vencimento',
            type: 'date',
            value: revenueInvoiceDueDate,
            onChange: setRevenueInvoiceDueDate,
            required: true,
        },
        {
            id: 'category',
            label: 'Categoria',
            type: 'select',
            value: selectedCategory,
            onChange: setSelectedCategory,
            placeholder: 'Selecione uma categoria',
            required: true,
            options: categories
                .filter(category => category.type.toUpperCase() === 'RECEITA')
                .map(category => ({ value: category.id, label: category.name })),
        },
    ];

    return (
        <GenericModal
            isOpen={true}
            title="Cadastrar Receita"
            formFields={formFields}
            onSubmit={handleAddRevenue}
            onCancel={handleCancel}
        />
    );
};

export default ModalRevenues;