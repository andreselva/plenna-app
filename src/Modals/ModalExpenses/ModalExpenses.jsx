import GenericModal from '../../Components/GenericModal/GenericModal';

const ModalExpenses = ({
    setIsModalOpen,
    handleAddExpense,
    newExpense,
    setNewExpense,
    expenseValue,
    setExpenseValue,
    expenseInvoiceDueDate,
    setExpenseInvoiceDueDate,
    categories,
    selectedCategory,
    setSelectedCategory,
    setEditingExpense,
    creditCards,
    selectedCard,
    setSelectedCard,
    installments,
    setInstallments,
    typeOfInstallment,
    setTypeOfInstallment
}) => {
    const handleCancel = () => {
        setNewExpense('');
        setExpenseValue('');
        setExpenseInvoiceDueDate('');
        setSelectedCategory('');
        setSelectedCard('');
        setEditingExpense(null);
        setIsModalOpen(false);
        setInstallments('');
        setTypeOfInstallment('U');
    };

    const formFields = [
        {
            fields: [
                {
                    id: 'expenseName',
                    label: 'Nome',
                    type: 'text',
                    value: newExpense,
                    onChange: setNewExpense,
                    placeholder: 'Ex: Luz, Internet...',
                    required: true,
                    size: 'half-width-large', // Define o tamanho do input
                },
                {
                    id: 'invoiceDueDate',
                    label: 'Vencimento',
                    type: 'date',
                    value: expenseInvoiceDueDate,
                    onChange: setExpenseInvoiceDueDate,
                    required: true,
                    size: 'half-width-medium', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
                {
                    id: 'expenseValue',
                    label: 'Valor R$',
                    type: 'number',
                    value: expenseValue,
                    onChange: setExpenseValue,
                    placeholder: '0,00',
                    required: true,
                    size: 'half-width-middle-medium', // Define o tamanho do input
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
                        .filter((category) => category.type.toUpperCase() === 'DESPESA')
                        .map((category) => ({ value: category.id, label: category.name })),
                    size: 'half-width-large', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
                {
                    id: 'creditCard',
                    label: 'Cartão de crédito',
                    type: 'select',
                    value: selectedCard,
                    onChange: setSelectedCard,
                    placeholder: 'Selecione um cartão',
                    required: false,
                    options: creditCards.map((creditCard) => ({ value: creditCard.id, label: creditCard.name })),
                    size: 'half-width-large', // Define o tamanho do input
                },
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
                    size: 'half-width-medium',
                },
                {
                    id: 'parcelas',
                    label: 'Parcelas',
                    type: 'number',
                    value: installments,
                    onChange: setInstallments,
                    placeholder: 0,
                    required: false,
                    size: 'half-width-small',
                    disabled: typeOfInstallment !== 'P'
                },
            ],
        },
    ];

    return (
        <GenericModal
            isOpen={true}
            title="Cadastrar Despesa"
            formFields={formFields}
            onSubmit={handleAddExpense}
            onCancel={handleCancel}
            submitButtonText="Adicionar"
            width="600px"
            height="500px"
        />
    );
};

export default ModalExpenses;
