import GenericModal from "../../Components/GenericModal/GenericModal";

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
}) => {
    const handleCancel = () => {
        setNewCategory('');
        setCategoryType('Receita');
        setCategoryColor('#000000');
        setIsModalOpen(false);
        setEditingCategory(null);
    };

    const formFields = [
        {
            fields: [
                {
                    id: 'categoryName',
                    label: 'Nome da Categoria',
                    type: 'text',
                    value: newCategory,
                    onChange: setNewCategory,
                    placeholder: 'Nome da categoria',
                    required: true,
                    size: 'full-width', // Define o tamanho do input
                },
            ],
        },
        {
            fields: [
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
                    size: 'half-width', // Define o tamanho do input
                },
                {
                    id: 'categoryColor',
                    label: 'Cor da Categoria',
                    type: 'color',
                    value: categoryColor,
                    onChange: setCategoryColor,
                    size: 'half-width', // Define o tamanho do input
                },
            ],
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
