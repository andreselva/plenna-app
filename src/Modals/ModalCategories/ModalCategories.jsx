import GenericModal from "../../Components/GenericModal/GenericModal";

const ModalCategories = ({
    setIsModalOpen,
    handleAddCategory,
    newCategory,
    setNewCategory,
    categoryType,
    setCategoryType,
    categoryDescription,
    setCategoryDescription,
    categoryColor,
    setCategoryColor,
    setEditingCategory,
    editingCategory,
}) => {
    const handleCancel = () => {
        setNewCategory('');
        setCategoryType('Receita');
        setCategoryDescription('');
        setCategoryColor('#000000');
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const formFields = [
        {
            id: 'categoryName',
            label: 'Nome da Categoria',
            type: 'text',
            value: newCategory,
            onChange: setNewCategory,
            placeholder: 'Nome da categoria',
            required: true,
        },
        {
            id: 'categoryType',
            label: 'Tipo de Categoria',
            type: 'select',
            value: categoryType,
            onChange: setCategoryType,
            placeholder: 'Selecione o tipo',
            required: true,
            options: [
                { value: 'Receita', label: 'Receita' },
                { value: 'Despesa', label: 'Despesa' },
            ],
        },
        {
            id: 'categoryDescription',
            label: 'Descrição',
            type: 'text',
            value: categoryDescription,
            onChange: setCategoryDescription,
            placeholder: 'Descrição da categoria',
        },
        {
            id: 'categoryColor',
            type: 'color',
            value: categoryColor,
            onChange: setCategoryColor,
        },
    ];

    return (
        <GenericModal
            isOpen={true}
            title={editingCategory ? 'Editar Categoria' : 'Cadastrar Categoria'}
            formFields={formFields}
            onSubmit={handleAddCategory}
            onCancel={handleCancel}
            submitButtonText={editingCategory ? 'Salvar' : 'Adicionar'}
        />
    );
};

export default ModalCategories;
