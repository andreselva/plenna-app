import GenericModal from '../../Components/GenericModal/GenericModal';

const BANK_ACCOUNT_TYPES = [
  { value: 'CHECKING', label: 'Conta corrente' },
  { value: 'SAVINGS', label: 'Poupança' },
  { value: 'DIGITAL_WALLET', label: 'Carteira digital' },
  { value: 'INVESTMENT', label: 'Investimento' },
  { value: 'PHYSICAL_WALLET', label: 'Carteira física' },
];

export const ModalBankAccounts = ({
  setIsModalOpen,
  handleAddAccount,
  setEditingAccount,
  editingAccount,
  formData,
  setField,
  resetForm,
}) => {
  const handleCancel = () => {
    resetForm();
    setEditingAccount(null);
    setIsModalOpen(false);
  };

  const formFields = [
    {
      title: 'Geral',
      fields: [
        {
          id: 'nameAccount',
          label: 'Nome',
          type: 'text',
          value: formData.name,
          onChange: (value) => setField('name', value),
          placeholder: 'Ex: Sicredi, Nubank PJ...',
          required: true,
          size: 'half-width-large',
        },
        {
          id: 'type',
          label: 'Tipo',
          type: 'select',
          value: formData.type,
          onChange: (value) => setField('type', value),
          options: BANK_ACCOUNT_TYPES,
          required: true,
          size: 'half-width-medium',
        },
      ],
    },
    {
      title: 'Dados bancários',
      fields: [
        {
          id: 'bankCode',
          label: 'Código do banco',
          type: 'number',
          value: formData.bankCode,
          onChange: (value) => setField('bankCode', value),
          placeholder: 'Ex: 748',
          size: 'half-width-middle-medium',
        },
        {
          id: 'agency',
          label: 'Agência',
          type: 'text',
          value: formData.agency,
          onChange: (value) => setField('agency', value),
          placeholder: 'Ex: 0123',
          size: 'half-width-middle-medium',
        },
        {
          id: 'accountNumber',
          label: 'Número da conta',
          type: 'text',
          value: formData.accountNumber,
          onChange: (value) => setField('accountNumber', value),
          placeholder: 'Ex: 12345-6',
          size: 'half-width-large',
        },
      ],
    },
    {
      title: 'Saldo e status',
      fields: [
        {
          id: 'initialBalance',
          label: 'Saldo inicial',
          type: 'number',
          value: formData.initialBalance,
          onChange: (value) => setField('initialBalance', value),
          placeholder: '0,00',
          step: '0.01',
          required: true,
          size: 'half-width-middle-medium',
        },
        {
          id: 'isActive',
          label: 'Conta ativa?',
          type: 'toggle',
          value: formData.isActive,
          onChange: (value) => setField('isActive', value),
          size: 'half-width-medium',
        },
      ],
    },
  ];

  return (
    <GenericModal
      isOpen={true}
      title={editingAccount ? 'Editar conta bancária' : 'Cadastrar conta bancária'}
      formFields={formFields}
      onSubmit={handleAddAccount}
      onCancel={handleCancel}
      submitButtonText={editingAccount ? 'Salvar' : 'Adicionar'}
      width="760px"
    />
  );
};
