import { useState } from 'react';
import './Categories.css';
import Modal from "../../Components/ModalCategories/ModalCategories";

const useCategories = () => {
    const [categories, setCategories] = useState([
        { id: 1, name: 'Categoria 1', type: 'receita', description: 'Descrição 1', color: '#ff0000' },
        { id: 2, name: 'Categoria 2', type: 'despesa', description: 'Descrição 2', color: '#00ff00' },
        { id: 3, name: 'Categoria 3', type: 'receita', description: 'Descrição 3', color: '#0000ff' },
        { id: 4, name: 'Categoria 4', type: 'despesa', description: 'Descrição 4', color: '#ffff00' }
    ]);

    const addCategory = (category) => {
        setCategories(prev => [...prev, { ...category, id: prev.length + 1 }]);
    };

    const deleteCategory = (id) => {
        setCategories(prev => prev.filter(category => category.id !== id));
    };

    const updateCategory = (id, updatedCategory) => {
        setCategories(prev => prev.map(category => category.id === id ? { ...category, ...updatedCategory } : category));
    };

    return { categories, addCategory, deleteCategory, updateCategory };
};

const Categories = () => {
    const { categories, addCategory, deleteCategory, updateCategory } = useCategories();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Estado para a nova categoria
    const [newCategory, setNewCategory] = useState('');
    const [categoryType, setCategoryType] = useState('receita');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Atualiza o estado da categoria com o valor do input
        if (name === 'name') setNewCategory(value);
        if (name === 'description') setCategoryDescription(value);
        if (name === 'color') setCategoryColor(value);
        if (name === 'type') setCategoryType(value);
    };

    const handleAddCategory = () => {
        if (!newCategory.trim()) {
            alert('O nome da categoria não pode ser vazio.');
            return;
        }

        addCategory({
            name: newCategory,
            type: categoryType,
            description: categoryDescription,
            color: categoryColor,
        });

        setNewCategory('');
        setCategoryType('receita');
        setCategoryDescription('');
        setCategoryColor('#000000');
        setIsModalOpen(false);
    };

    const handleEditCategory = (category) => {
        setEditingCategory(category);
        setNewCategory(category.name);
        setCategoryType(category.type);
        setCategoryDescription(category.description);
        setCategoryColor(category.color);
        setIsModalOpen(true);
    };

    const handleSaveCategory = () => {
        if (!newCategory.trim()) {
            alert('O nome da categoria não pode ser vazio.');
            return;
        }

        if (editingCategory) {
            updateCategory(editingCategory.id, {
                name: newCategory,
                type: categoryType,
                description: categoryDescription,
                color: categoryColor,
            });
        } else {
            handleAddCategory();
        }

        setEditingCategory(null);
        setNewCategory('');
        setCategoryType('receita');
        setCategoryDescription('');
        setCategoryColor('#000000');
        setIsModalOpen(false);
    };

    const handleDeleteCategory = (id) => {
        deleteCategory(id);
    };

    return (
        <div className="Categories">
            <div className="Categories-content">
                <button className="show-categories-btn" onClick={() => setIsModalOpen(true)}>
                    Cadastrar categoria
                </button>

                <div className="card-categories">
                    <h3>Categorias</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>Nome da Categoria</th>
                            <th>Tipo</th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td style={{ color: category.color }}>{category.name}</td>
                                    <td>{category.type}</td>
                                    <td className="actions">
                                        <button onClick={() => handleEditCategory(category)}>Editar</button>
                                        <button onClick={() => handleDeleteCategory(category.id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">Nenhuma categoria cadastrada</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    handleAddCategory={handleSaveCategory}
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    categoryType={categoryType}
                    setCategoryType={setCategoryType}
                    categoryDescription={categoryDescription}
                    setCategoryDescription={setCategoryDescription}
                    categoryColor={categoryColor}
                    setCategoryColor={setCategoryColor}
                />
            )}
        </div>
    );
};

export default Categories;
