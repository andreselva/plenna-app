import './ModalCategories.css';

const Modal = ({
                   setIsModalOpen,
                   handleAddCategory,
                   newCategory,
                   setNewCategory,
                   categoryType,
                   setCategoryType,
                   categoryDescription,
                   setCategoryDescription,
                   categoryColor,
                   setCategoryColor
               }) => {
    const handleCancel = () => {
        setNewCategory('');
        setCategoryType('receita');
        setCategoryDescription('');
        setCategoryColor('#000000');

        setIsModalOpen(false);
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Cadastrar categoria</h2>

                <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Nome da categoria"
                />

                <div className="form-group">
                    <label>Tipo de Categoria</label>
                    <select
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                    >
                        <option value="receita">Receita</option>
                        <option value="despesa">Despesa</option>
                        <option value="ambos">Ambos</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        value={categoryDescription}
                        onChange={(e) => setCategoryDescription(e.target.value)}
                        placeholder="Descrição da categoria"
                    />
                </div>

                <div className="form-group">
                    <label>Cor</label>
                    <input
                        type="color"
                        value={categoryColor}
                        onChange={(e) => setCategoryColor(e.target.value)}
                    />
                </div>

                <div className="modal-buttons">
                    <button onClick={handleAddCategory}>Adicionar</button>
                    <button onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
