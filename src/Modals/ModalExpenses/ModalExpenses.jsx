import './ModalExpenses.css';

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

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cadastrar Despesa</h2>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddExpense();
                }}>
                    <div className="form-group">
                        <label htmlFor="expenseName">Nome</label>
                        <input
                            id="expenseName"
                            type="text"
                            value={newExpense}
                            onChange={(e) => setNewExpense(e.target.value)}
                            placeholder="Ex: Luz, Internet..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expenseDescription">Descrição</label>
                        <input
                            id="expenseDescription"
                            type="text"
                            value={expenseDescription}
                            onChange={(e) => setExpenseDescription(e.target.value)}
                            placeholder="Descreva a despesa (opcional)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expenseValue">Valor R$</label>
                        <input
                            id="expenseValue"
                            type="number"
                            value={expenseValue}
                            onChange={(e) => setExpenseValue(e.target.value)}
                            placeholder="0,00"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="invoiceDueDate">Vencimento</label>
                        <input
                            id="invoiceDueDate"
                            type="date"
                            value={expenseInvoiceDueDate}
                            onChange={(e) => setExpenseInvoiceDueDate(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Categoria</label>
                        <select
                            id="category"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            required
                        >
                            <option value="">Selecione uma categoria</option>
                            {categories
                                .filter(category => category.type.toUpperCase() === 'DESPESA')
                                .map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div className="modal-buttons">
                        <button type="submit" className="btn-primary">Salvar</button>
                        <button type="button" onClick={handleCancel} className="btn-secondary">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalExpenses;
