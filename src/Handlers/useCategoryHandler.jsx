import { useState } from 'react';
import { CategoryManager } from '../Hooks/CategoryManager/CategoryManager';
import { CategoryKind } from '../enum/category-kind.enum';
import SweetAlert from '../Components/Alerts/SweetAlert';

export const useCategoryHandler = () => {
  const { categories, addCategory, deleteCategory, updateCategory, loading, error } = CategoryManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalSubcategoryOpen, setIsModalSubcategoryOpen] = useState(false);

  const [editingCategory, setEditingCategory] = useState(null);
  const [parentCategory, setParentCategory] = useState(null);

  const [newCategory, setNewCategory] = useState('');
  const [categoryType, setCategoryType] = useState('Receita');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryColor, setCategoryColor] = useState('#000000');
  const [categoryKind, setCategoryKind] = useState(CategoryKind.CATEGORY);

  const resetForm = () => {
    setNewCategory('');
    setCategoryType('Receita');
    setCategoryDescription('');
    setCategoryColor('#000000');
    setEditingCategory(null);
    setCategoryKind(CategoryKind.CATEGORY);
    setParentCategory(null);
  };

  const handleAddSubcategory = (category) => {
    setParentCategory(category);
    setCategoryKind(CategoryKind.SUBCATEGORY);
    setNewCategory('');
    setCategoryType(category.type);
    setCategoryDescription('');
    setCategoryColor('#000000');
    setIsModalSubcategoryOpen(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setParentCategory(null);
    setCategoryKind(CategoryKind.CATEGORY);
    setNewCategory(category.name);
    setCategoryType(category.type);
    setCategoryDescription(category.description || '');
    setCategoryColor(category.color || '#000000');
    setIsModalOpen(true);
  };

  const handleSaveCategory = () => {
    if (!newCategory || !newCategory.trim()) {
      SweetAlert.error('O nome não pode ser vazio.');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: newCategory,
        type: categoryType,
        description: categoryDescription,
        color: categoryColor,
      });
      resetForm();
      setIsModalOpen(false);
      return;
    }

    const payload = {
      name: newCategory,
      type: categoryType,
      description: categoryDescription,
      color: categoryColor,
      kind: categoryKind,
      parentId: parentCategory?.id ? parentCategory.id : 0,
    };

    addCategory(payload);
    resetForm();

    if (isModalSubcategoryOpen) setIsModalSubcategoryOpen(false);
    else setIsModalOpen(false);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
  };

  return {
    loading,
    error,
    categories,

    // actions
    handleSaveCategory,
    handleEditCategory,
    handleDeleteCategory,
    handleAddSubcategory,

    // ui state
    isModalOpen,
    setIsModalOpen,
    isModalSubcategoryOpen,
    setIsModalSubcategoryOpen,

    // form state
    editingCategory,
    setEditingCategory,
    parentCategory,
    newCategory,
    setNewCategory,
    categoryType,
    setCategoryType,
    categoryDescription,
    setCategoryDescription,
    categoryColor,
    setCategoryColor,
    setCategoryKind,
  };
};
