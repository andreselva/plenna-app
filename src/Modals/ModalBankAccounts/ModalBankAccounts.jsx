import GenericModal from '../../Components/GenericModal/GenericModal';

export const ModalBankAccounts = ({
    setIsModalOpen,
    handleAddAccount,
    setNewAccount,
    newAccount,
    setEditingAccount,
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
            title="Cadastrar Conta Bancária"
            formFields={formFields}
            onSubmit={handleAddAccount}
            onCancel={handleCancel}
        />
    );
};