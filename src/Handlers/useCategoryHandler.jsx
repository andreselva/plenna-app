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

  const [sidebarCategory, setSidebarCategory] = useState(null);
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(false);

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
      const payloadUpdate = {
        name: newCategory,
        type: categoryType,
        description: categoryDescription,
        color: categoryColor,
        kind: CategoryKind.CATEGORY,
        parentId: 0,
      };
      updateCategory(editingCategory.id, payloadUpdate);
      resetForm();
      setIsModalOpen(false);
      return;
    }

    const payloadCreate = {
      name: newCategory,
      type: categoryType,
      description: categoryDescription,
      color: categoryColor,
      kind: categoryKind,
      parentId: parentCategory?.id ? parentCategory.id : 0,
    };

    addCategory(payloadCreate);
    resetForm();

    if (isModalSubcategoryOpen) setIsModalSubcategoryOpen(false);
    else setIsModalOpen(false);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
  };

  // Sidebar de subcategorias
  const openSubSidebar = (category) => {
    setSidebarCategory(category);
    setIsSubSidebarOpen(true);
  };
  const closeSubSidebar = () => {
    setIsSubSidebarOpen(false);
    setSidebarCategory(null);
  };

  const handleUpdateSubcategory = async (id, payload) => {
    return await updateCategory(id, payload);
  };

  const handleDeleteSubcategory = async (id) => {
    return await deleteCategory(id);
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
    categoryKind,
    setCategoryKind,

    // sidebar
    openSubSidebar,
    closeSubSidebar,
    isSubSidebarOpen,
    sidebarCategory,

    // subcategory ops
    handleUpdateSubcategory,
    handleDeleteSubcategory,
  };
};
