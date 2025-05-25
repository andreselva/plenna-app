import GenericModal from '../../Components/GenericModal/GenericModal';

export const ModalBankAccounts = ({
    setIsModalOpen,
    handleAddAccount,
    setNewAccount,
    newAccount,
    setEditingAccount,
    editingAccount,
    generateInvoice,
    setGerenateInvoice,
    dueDate,
    setDueDate,
    closingDate,
    setClosingDate
}) => {
    const handleCancel = () => {
        setNewAccount('');
        setEditingAccount(null);
        setIsModalOpen(false);
        setGerenateInvoice(false);
    };

    let formFields = [
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
                    size: 'full-width',
                }
            ]
        },
        {
            fields: [
                {
                    id: 'isInstallment',
                    label: 'Gerar fatura?',
                    type: 'toggle',
                    value: generateInvoice,
                    onChange: (value) => setGerenateInvoice(value),
                    required: false,
                    size: 'half-width-medium',
                    disabled: false,
                },
            ]
        }
    ];

    if (generateInvoice) {
        formFields.push({
            title: 'Configurações da fatura',
            fields: [
                {
                    id: 'dueDate',
                    label: 'Vencimento da fatura',
                    type: 'date',
                    value: dueDate,
                    onChange: setDueDate,
                    required: true,
                    size: 'half-width-middle-medium'
                },
                {
                    id: 'closingDate',
                    label: 'Fechamento da fatura',
                    type: 'date',
                    value: closingDate,
                    onChange: setClosingDate,
                    required: true,
                    size: 'half-width-middle-medium'
                }
            ]
        });
    }

    return (
        <GenericModal
            isOpen={true}
            title={editingAccount ? 'Editar conta' : 'Cadastrar conta'}
            formFields={formFields} // A lista dinâmica é passada para o modal
            onSubmit={handleAddAccount}
            onCancel={handleCancel}
            submitButtonText={editingAccount ? 'Salvar' : 'Adicionar'}
        />
    );
};