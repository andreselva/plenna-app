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
    setEditingRevenue,
    typeOfInstallment,
    setTypeOfInstallment,
    installments,
    setInstallments
}) => {
    const handleCancel = () => {
        setNewRevenue('');
        setRevenueValue('');
        setRevenueInvoiceDueDate('');
        setSelectedCategory('');
        setEditingRevenue(null);
        setIsModalOpen(false);
        setInstallments('');
        setTypeOfInstallment('U');
    };

    const formFields = [
        {
            fields: [
                {
                    id: 'revenueName',
                    label: 'Nome',
                    type: 'text',
                    value: newRevenue,
                    onChange: setNewRevenue,
                    placeholder: 'Ex: Salário, Freelancer...',
                    required: true,
                    size: 'full-width', // Define o tamanho do input
                },
                {
                    id: 'invoiceDueDate',
                    label: 'Vencimento',
                    type: 'date',
                    value: revenueInvoiceDueDate,
                    onChange: setRevenueInvoiceDueDate,
                    required: true,
                    size: 'half-width', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
                {
                    id: 'revenueValue',
                    label: 'Valor (R$)',
                    type: 'number',
                    value: revenueValue,
                    onChange: setRevenueValue,
                    placeholder: '0,00',
                    step: '0.01',
                    required: true,
                    size: 'half-width', // Define o tamanho do input
                },
                {
                    id: 'category',
                    label: 'Categoria',
                    type: 'select',
                    value: selectedCategory,
                    onChange: setSelectedCategory,
                    placeholder: 'Selecione',
                    required: true,
                    options: categories
                        .filter((category) => category.type.toUpperCase() === 'RECEITA')
                        .map((category) => ({ value: category.id, label: category.name })),
                    size: 'half-width-large', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
                {
                    id: 'typeOfExpense',
                    label: 'Tipo de Despesa',
                    type: 'select',
                    value: typeOfInstallment,
                    onChange: setTypeOfInstallment,
                    required: false,
                    options: [
                        { value: 'U', label: 'Única' },
                        { value: 'P', label: 'Parcelada' },
                        { value: 'F', label: 'Fixa' }
                    ],
                    size: 'half-width-large',
                },
                {
                    id: 'parcelas',
                    label: 'Parcelas',
                    type: 'number',
                    value: installments,
                    onChange: setInstallments,
                    placeholder: 0,
                    required: false,
                    size: 'half-width-medium',
                    disabled: typeOfInstallment !== 'P'
                },
            ],
        },
    ];

    return (
        <GenericModal
            isOpen={true}
            title="Cadastrar Receita"
            formFields={formFields}
            onSubmit={handleAddRevenue}
            onCancel={handleCancel}
            submitButtonText="Adicionar"
            width="500px"
            height="500px"
        />
    );
};

export default ModalRevenues;