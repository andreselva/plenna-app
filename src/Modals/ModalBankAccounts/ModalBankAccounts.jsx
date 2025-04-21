import GenericModal from '../../Components/GenericModal/GenericModal';

export const ModalBankAccounts = ({
    setIsModalOpen,
    handleAddAccount,
    setNewAccount,
    newAccount,
    setEditingAccount,
    editingAccount
}) => {
    const handleCancel = () => {
        setNewAccount('');
        setEditingAccount(null);
        setIsModalOpen(false);
    };

    const formFields = [
        {
            id: 'nameAccount',
            label: 'Nome',
            type: 'text',
            value: newAccount,
            onChange: setNewAccount,
            placeholder: 'Ex: Sicredi, Bradesco...',
            required: true,
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