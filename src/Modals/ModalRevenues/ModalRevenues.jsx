import './ModalRevenues.css';

const ModalRevenues = ({
    setIsModalOpen,
    handleAddRevenue,
    newRevenue,
    setNewRevenue,
    revenueDescription,
    setRevenueDescription,
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
        setRevenueDescription('');
        setRevenueValue('');
        setRevenueInvoiceDueDate('');
        setSelectedCategory('');
        setEditingRevenue(null);
        setIsModalOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cadastrar Receita</h2>

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleAddRevenue();
                }}>
                    <div className="form-group">
                        <label htmlFor="revenueName">Nome</label>
                        <input
                            id="revenueName"
                            type="text"
                            value={newRevenue}
                            onChange={(e) => setNewRevenue(e.target.value)}
                            placeholder="Ex: Salário, Freelancer..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="revenueDescription">Descrição</label>
                        <input
                            id="revenueDescription"
                            type="text"
                            value={revenueDescription}
                            onChange={(e) => setRevenueDescription(e.target.value)}
                            placeholder="Descreva a receita (opcional)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="revenueValue">Valor (R$)</label>
                        <input
                            id="revenueValue"
                            type="number"
                            step="0.01"
                            value={revenueValue}
                            onChange={(e) => setRevenueValue(e.target.value)}
                            placeholder="0,00"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="invoiceDueDate">Vencimento</label>
                        <input
                            id="invoiceDueDate"
                            type="date"
                            value={revenueInvoiceDueDate}
                            onChange={(e) => setRevenueInvoiceDueDate(e.target.value)}
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
                                .filter(category => category.type.toUpperCase() === 'RECEITA')
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

export default ModalRevenues;
