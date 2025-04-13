import { useState } from 'react';
import styles from './Categories.module.css'; // Importando o CSS como módulo
import Modal from "../../Modals/ModalCategories/ModalCategories";
import { CategoryManager } from "../../Hooks/CategoryManager/CategoryManager";
import CategoryTable from "../../Tables/CategoryTable/CategoryTable";

const Categories = () => {
    const { categories, addCategory, deleteCategory, updateCategory } = CategoryManager();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    const [newCategory, setNewCategory] = useState('');
    const [categoryType, setCategoryType] = useState('Receita');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000');

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
        setCategoryType('');
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
        setCategoryType('Receita');
        setCategoryDescription('');
        setCategoryColor('#000000');
        setIsModalOpen(false);
    };

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id);
    };

    return (
        <div className={styles.Categories}>
            <div className={styles['Categories-content']}>
                <button className={styles['show-categories-btn']} onClick={() => setIsModalOpen(true)}>
                    Cadastrar categoria
                </button>

                <div className={styles['card-categories']}>
                    <h3>Categorias</h3>

                    <CategoryTable
                        categories={categories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                    />
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
                    setEditingCategory={setEditingCategory}
                    editingCategory={editingCategory}
                />
            )}
        </div>
    );
};

export default Categories;
