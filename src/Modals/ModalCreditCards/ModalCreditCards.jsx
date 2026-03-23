import GenericModal from '../../Components/GenericModal/GenericModal';

export const ModalCreditCards = ({
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
  setClosingDate,
}) => {
  const handleCancel = () => {
    setNewAccount('');
    setEditingAccount(null);
    setIsModalOpen(false);
    setGerenateInvoice(false);
    setDueDate('');
    setClosingDate('');
  };

  let formFields = [
    {
      title: 'Geral',
      fields: [
        {
          id: 'nameAccount',
          label: 'Nome',
          type: 'text',
          value: newAccount,
          onChange: (value) => setNewAccount(value),
          placeholder: 'Ex: Nubank, Visa, Mastercard...',
          required: true,
          size: 'full-width',
        },
      ],
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
      ],
    },
  ];

  if (generateInvoice) {
    formFields.push({
      title: 'Configurações da fatura',
      fields: [
        {
          id: 'dueDate',
          label: 'Dia de vencimento da fatura',
          type: 'text',
          value: dueDate,
          onChange: setDueDate,
          required: true,
          size: 'half-width-middle-medium',
        },
        {
          id: 'closingDate',
          label: 'Dia de fechamento da fatura',
          type: 'text',
          value: closingDate,
          onChange: setClosingDate,
          required: true,
          size: 'half-width-middle-medium',
        },
      ],
    });
  }

  return (
    <GenericModal
      isOpen={true}
      title={editingAccount ? 'Editar cartão' : 'Cadastrar cartão'}
      formFields={formFields}
      onSubmit={handleAddAccount}
      onCancel={handleCancel}
      submitButtonText={editingAccount ? 'Salvar' : 'Adicionar'}
      width="600px"
    />
  );
};
