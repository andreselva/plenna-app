import GenericModal from '../../Components/GenericModal/GenericModal';

const ModalExpenses = ({
    setIsModalOpen,
    handleAddExpense,
    newExpense,
    setNewExpense,
    expenseDescription,
    setExpenseDescription,
    expenseValue,
    setExpenseValue,
    expenseInvoiceDueDate,
    setExpenseInvoiceDueDate,
    categories,
    selectedCategory,
    setSelectedCategory,
    setEditingExpense
}) => {
    const handleCancel = () => {
        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('');
        setExpenseInvoiceDueDate('');
        setSelectedCategory('');
        setEditingExpense(null);
        setIsModalOpen(false);
    };

    const formFields = [
        {
            id: 'expenseName',
            label: 'Nome',
            type: 'text',
            value: newExpense,
            onChange: setNewExpense,
            placeholder: 'Ex: Luz, Internet...',
            required: true,
        },
        {
            id: 'expenseDescription',
            label: 'Descrição',
            type: 'text',
            value: expenseDescription,
            onChange: setExpenseDescription,
            placeholder: 'Descreva a despesa (opcional)',
        },
        {
            id: 'expenseValue',
            label: 'Valor R$',
            type: 'number',
            value: expenseValue,
            onChange: setExpenseValue,
            placeholder: '0,00',
            required: true,
        },
        {
            id: 'invoiceDueDate',
            label: 'Vencimento',
            type: 'date',
            value: expenseInvoiceDueDate,
            onChange: setExpenseInvoiceDueDate,
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
                .filter(category => category.type.toUpperCase() === 'DESPESA')
                .map(category => ({ value: category.id, label: category.name })),
        },
    ];

    return (
        <GenericModal
            isOpen={true}
            title="Cadastrar Despesa"
            formFields={formFields}
            onSubmit={handleAddExpense}
            onCancel={handleCancel}
        />
    );
};

export default ModalExpenses;
