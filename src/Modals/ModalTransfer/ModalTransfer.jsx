import GenericModal from "../../Components/GenericModal/GenericModal";

export const ModalTransfer = ({
  setIsModalOpen,
  handleSaveTransfer,
  formData,
  setField,
  resetForm,
  accounts = [],
}) => {
  const handleCancel = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const accountOptions = accounts.map((account) => ({
    value: String(account.id),
    label: account.name,
  }));

  const formFields = [
    {
      title: "Contas",
      fields: [
        {
          id: "originAccount",
          label: "Conta de origem",
          type: "select",
          value: formData.originAccount,
          onChange: (value) => setField("originAccount", value),
          placeholder: "Selecione a conta de origem",
          required: true,
          options: accountOptions,
          size: "half-width-large",
        },
        {
          id: "targetAccount",
          label: "Conta de destino",
          type: "select",
          value: formData.targetAccount,
          onChange: (value) => setField("targetAccount", value),
          placeholder: "Selecione a conta de destino",
          required: true,
          options: accountOptions,
          size: "half-width-large",
        },
      ],
    },
    {
      title: "Detalhes da transferência",
      fields: [
        {
          id: "amount",
          label: "Valor (R$)",
          type: "number",
          value: formData.amount,
          onChange: (value) => setField("amount", value),
          placeholder: "0,00",
          step: "0.01",
          required: true,
          size: "half-width-middle-medium",
        },
        {
          id: "transferDate",
          label: "Data da transferência",
          type: "date",
          value: formData.transferDate,
          onChange: (value) => setField("transferDate", value),
          required: true,
          size: "half-width-middle-medium",
        },
      ],
    },
  ];

  return (
    <GenericModal
      isOpen={true}
      title="Nova transferência"
      formFields={formFields}
      onSubmit={handleSaveTransfer}
      onCancel={handleCancel}
      submitButtonText="Transferir"
      width="700px"
    />
  );
};
