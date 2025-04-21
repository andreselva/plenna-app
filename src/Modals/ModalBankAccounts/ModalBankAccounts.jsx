import GenericModal from '../../Components/GenericModal/GenericModal';

export const ModalBankAccounts = ({
    setIsModalOpen,
    handleAddAccount,
    setNewAccount,
    newAccount,
    setEditingAccount,
    editingAccount,
}) => {
    const handleCancel = () => {
        setNewAccount('');
        setEditingAccount(null);
        setIsModalOpen(false);
    };

    const formFields = [
        {
            fields: [
                {
                    id: 'nameAccount',
                    label: 'Nome',
                    type: 'text',
                    value: newAccount,
                    onChange: (value) => setNewAccount(value),
                    placeholder: 'Ex: Sicredi, Bradesco...',
                    required: true,
                    size: 'full-width', // Define o tamanho do input
                },
            ],
        },
    ];

    return (
        <GenericModal
            isOpen={true}
            title={editingAccount ? 'Editar conta' : 'Cadastrar conta'}
            formFields={formFields}
            onSubmit={handleAddAccount}
            onCancel={handleCancel}
            submitButtonText={editingAccount ? 'Salvar' : 'Adicionar'}
        />
    );
};