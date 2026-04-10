import React, { useEffect } from 'react';
import GenericModal from "../../Components/GenericModal/GenericModal";
import { CategoryKind } from '../../enum/category-kind.enum';

const ModalCategories = ({
  setIsModalOpen,
  handleAddCategory,
  newCategory,
  setNewCategory,
  categoryType,
  setCategoryType,
  categoryColor,
  setCategoryColor,
  setEditingCategory,
  editingCategory,
  setCategoryKind,
}) => {

  setCategoryKind(CategoryKind.CATEGORY);

  const handleCancel = () => {
    setNewCategory('');
    setCategoryType('Receita');
    setCategoryColor('#000000');
    setCategoryKind(CategoryKind.CATEGORY);
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const formFields = [
    {
      title: 'Geral',
      fields: [
        {
          id: 'name',
          label: 'Nome da Categoria',
          type: 'text',
          value: newCategory,
          onChange: setNewCategory,
          placeholder: 'Nome da categoria',
          required: true,
          size: 'full-width',
        },
      ],
    },
    {
      fields: [
        {
          id: 'type',
          label: 'Tipo de Categoria',
          type: 'select',
          value: categoryType,
          onChange: setCategoryType,
          placeholder: 'Selecione o tipo',
          required: true,
          options: [
            { value: 'Receita', label: 'Conta a receber' },
            { value: 'Despesa', label: 'Conta a pagar' },
          ],
          size: 'half-width',
        },
        {
          id: 'color',
          label: 'Cor da Categoria',
          type: 'color',
          value: categoryColor,
          onChange: setCategoryColor,
          size: 'half-width',
        },
        {
          id: 'categoryKind',
          type: 'hidden',
          value: CategoryKind.CATEGORY,
        },
      ],
    },
  ];

  return (
    <GenericModal
      isOpen={true}
      title={editingCategory ? 'Editar categoria' : 'Cadastrar categoria'}
      formFields={formFields}
      onSubmit={handleAddCategory}
      onCancel={handleCancel}
      submitButtonText={editingCategory ? 'Salvar' : 'Adicionar'}
    />
  );
};

export default ModalCategories;
