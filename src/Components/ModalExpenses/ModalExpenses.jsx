import './ModalExpenses.css';

const ModalExpenses = ({
                           setIsModalOpen,
                           handleSaveExpense,
                           newExpense,
                           setNewExpense,
                           expenseDescription,
                           setExpenseDescription,
                           expenseValue,
                           setExpenseValue,
                           expensePay,
                           setExpensePay,
                           categories,
                           selectedCategory,
                           setSelectedCategory
                       }) => {
    const handleCancel = () => {
        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpensePay('');
        setSelectedCategory('');
        setIsModalOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cadastrar despesa</h2>

                <input
                    type="text"
                    value={newExpense}
                    onChange={(e) => setNewExpense(e.target.value)}
                    placeholder="Nome da categoria"
                />

                <div className="form-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        value={expenseDescription}
                        onChange={(e) => setExpenseDescription(e.target.value)}
                        placeholder="Descrição da categoria"
                    />
                </div>

                <div className="form-group">
                    <label>Valor</label>
                    <input
                        type="text"
                        value={expenseValue}
                        onChange={(e) => setExpenseValue(e.target.value)}
                        placeholder="Valor"
                    />
                </div>

                <div className="form-group">
                    <label>Vencimento</label>
                    <input
                        type="text"
                        value={expensePay}
                        onChange={(e) => setExpensePay(e.target.value)}
                        placeholder="Vencimento"
                    />
                </div>

                <div className="form-group">
                    <label>Categoria</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {categories
                            .filter(category => category.type === 'despesa')
                            .map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="modal-buttons">
                    <button onClick={handleSaveExpense}>Salvar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalExpenses;
