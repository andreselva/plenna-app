import GenericModal from "../../Components/GenericModal/GenericModal";

const formatCurrency = (value) => {
  const numericValue = Number(value || 0);
  return numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

export const ModalRevertTransfer = ({
  transfer,
  accounts = [],
  revertDate,
  setRevertDate,
  onConfirm,
  onCancel,
}) => {
  const getAccountName = (id) => {
    const account = accounts.find((a) => a.id === Number(id));
    return account?.name ?? `Conta #${id}`;
  };

  const originName = transfer.originAccountName ?? getAccountName(transfer.originAccount);
  const destinationName = transfer.destinationAccountName ?? getAccountName(transfer.targetAccount);

  const formFields = [
    {
      title: "Contas",
      fields: [
        {
          id: "originAccountName",
          label: "Devolver de",
          type: "text",
          value: destinationName,
          onChange: () => {},
          disabled: true,
          size: "half-width-large",
        },
        {
          id: "destinationAccountName",
          label: "Devolver para",
          type: "text",
          value: originName,
          onChange: () => {},
          disabled: true,
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
          type: "text",
          value: formatCurrency(transfer.amount),
          onChange: () => {},
          disabled: true,
          size: "half-width-middle-medium",
        },
        {
          id: "transferDate",
          label: "Data do estorno",
          type: "date",
          value: revertDate,
          onChange: (value) => setRevertDate(value),
          required: true,
          size: "half-width-middle-medium",
        },
      ],
    },
  ];

  return (
    <GenericModal
      isOpen={true}
      title="Estornar transferência"
      formFields={formFields}
      onSubmit={() => onConfirm()}
      onCancel={onCancel}
      submitButtonText="Confirmar estorno"
      width="700px"
    />
  );
};
