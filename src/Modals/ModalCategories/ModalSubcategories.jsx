import GenericModal from "../../Components/GenericModal/GenericModal";
import { CategoryKind } from "../../enum/category-kind.enum";

const ModalSubcategories = ({
  setIsModalOpen,
  onSubmit,
  newCategory,
  setNewCategory,
  categoryColor,
  setCategoryColor,
  parentCategory
}) => {
  const handleCancel = () => {
    setNewCategory('');
    setCategoryColor('#000000');
    setIsModalOpen(false);
  };

  const formFields = [
    {
      title: 'Geral',
      fields: [
        {
          id: 'name',
          label: 'Nome da subcategoria',
          type: 'text',
          value: newCategory,
          onChange: setNewCategory,
          placeholder: 'Nome da subcategoria',
          required: true,
          size: 'full-width',
        },
      ],
    },
    {
      fields: [
        {
          id: 'type',
          label: 'Tipo (herdado da categoria)',
          type: 'select',
          value: parentCategory?.type || 'Receita',
          options: [
            { value: 'Receita', label: 'Receita' },
            { value: 'Despesa', label: 'Despesa' },
          ],
          disabled: true,
          size: 'half-width',
        },
        {
          id: 'color',
          label: 'Cor da subcategoria',
          type: 'color',
          value: categoryColor,
          onChange: setCategoryColor,
          size: 'half-width',
        },
        {
          id: 'kind',
          type: 'hidden',
          value: CategoryKind.SUBCATEGORY,
        },
        {
          id: 'parentId',
          type: 'hidden',
          value: parentCategory?.id ?? 0,
        },
      ],
    },
  ];

  const parentName = parentCategory?.name;

  return (
    <GenericModal
      isOpen={true}
      title={parentName ? `Cadastrar subcategoria (${parentName})` : 'Cadastrar subcategoria'}
      formFields={formFields}
      onSubmit={onSubmit}
      onCancel={handleCancel}
      submitButtonText="Adicionar"
    />
  );
};

export default ModalSubcategories;
