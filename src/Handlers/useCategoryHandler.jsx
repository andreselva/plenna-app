import { useState } from 'react';
import { CategoryManager } from '../Hooks/CategoryManager/CategoryManager';

export const useCategoryHandler = () => {
    const { categories, addCategory, deleteCategory, updateCategory } = CategoryManager();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [newCategory, setNewCategory] = useState('');
    const [categoryType, setCategoryType] = useState('Receita');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [categoryColor, setCategoryColor] = useState('#000000');

    const resetForm = () => {
        setNewCategory('');
        setCategoryType('Receita');
        setCategoryDescription('');
        setCategoryColor('#000000');
        setEditingCategory(null);
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

        resetForm();
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
            return;
        }

        resetForm();
        setIsModalOpen(false);
    };

    const handleDeleteCategory = async (id) => {
        await deleteCategory(id);
    };

    return {
        categories,
        isModalOpen,
        setIsModalOpen,
        editingCategory,
        setEditingCategory,
        newCategory,
        setNewCategory,
        categoryType,
        setCategoryType,
        categoryDescription,
        setCategoryDescription,
        categoryColor,
        setCategoryColor,
        handleAddCategory,
        handleEditCategory,
        handleSaveCategory,
        handleDeleteCategory
    };
};
