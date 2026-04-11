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
          id: "accountId",
          label: "Conta de origem",
          type: "select",
          value: formData.accountId,
          onChange: (value) => setField("accountId", value),
          placeholder: "Selecione a conta de origem",
          required: true,
          options: accountOptions,
          size: "half-width-large",
        },
        {
          id: "payableId",
          label: "Conta de destino",
          type: "select",
          value: formData.payableId,
          onChange: (value) => setField("payableId", value),
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
          id: "value",
          label: "Valor (R$)",
          type: "number",
          value: formData.value,
          onChange: (value) => setField("value", value),
          placeholder: "0,00",
          step: "0.01",
          required: true,
          size: "half-width-middle-medium",
        },
        {
          id: "paymentDate",
          label: "Data da transferência",
          type: "date",
          value: formData.paymentDate,
          onChange: (value) => setField("paymentDate", value),
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
