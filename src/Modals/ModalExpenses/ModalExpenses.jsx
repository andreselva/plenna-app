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
}) => {
    const handleCancel = () => {
        setNewExpense('');
        setExpenseValue('');
        setExpenseInvoiceDueDate('');
        setSelectedCategory('');
        setSelectedCard('');
        setEditingExpense(null);
        setIsModalOpen(false);
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
                    size: 'full-width', // Define o tamanho do input
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
                    size: 'half-width', // Define o tamanho do input
                },
                {
                    id: 'invoiceDueDate',
                    label: 'Vencimento',
                    type: 'date',
                    value: expenseInvoiceDueDate,
                    onChange: setExpenseInvoiceDueDate,
                    required: true,
                    size: 'half-width', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
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
                    size: 'full-width', // Define o tamanho do input
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
                    size: 'full-width', // Define o tamanho do input
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
        />
    );
};

export default ModalExpenses;
