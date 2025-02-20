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
                           revenuePay,
                           setRevenuePay,
                           categories,
                           selectedCategory,
                           setSelectedCategory,
                           setEditingRevenue
                       }) => {
    const handleCancel = () => {
        setNewRevenue('');
        setRevenueDescription('');
        setRevenueValue('0');
        setRevenuePay('');
        setSelectedCategory('');
        setEditingRevenue(null);
        setIsModalOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cadastrar despesa</h2>

                <input
                    type="text"
                    value={newRevenue}
                    onChange={(e) => setNewRevenue(e.target.value)}
                    placeholder="Nome"
                />

                <div className="form-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        value={revenueDescription}
                        onChange={(e) => setRevenueDescription(e.target.value)}
                        placeholder="Descrição"
                    />
                </div>

                <div className="form-group">
                    <label>Valor</label>
                    <input
                        type="text"
                        value={revenueValue}
                        onChange={(e) => setRevenueValue(e.target.value)}
                        placeholder="Valor"
                    />
                </div>

                <div className="form-group">
                    <label>Vencimento</label>
                    <input
                        type="text"
                        value={revenuePay}
                        onChange={(e) => setRevenuePay(e.target.value)}
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
                            .filter(category => category.type == 'Receita')
                            .map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                    </select>

                </div>

                <div className="modal-buttons">
                    <button onClick={handleAddRevenue}>Salvar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default ModalRevenues;
