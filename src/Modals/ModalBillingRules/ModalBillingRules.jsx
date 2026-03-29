import GenericModal from '../../Components/GenericModal/GenericModal';

export const ModalBillingRules = ({
  setIsModalOpen,
  handleSaveBillingRule,
  setEditingBillingRule,
  editingBillingRule,
  formData,
  setField,
  resetForm,
  paymentMethods,
  gateways,
}) => {
  const handleCancel = () => {
    resetForm();
    setEditingBillingRule(null);
    setIsModalOpen(false);
  };

  const paymentMethodOptions = paymentMethods.map((paymentMethod) => ({
    value: String(paymentMethod.code),
    label: `${paymentMethod.code} - ${paymentMethod.name}`,
  }));

  const gatewayOptions = gateways.map((gateway) => ({
    value: String(gateway.id),
    label: gateway.name,
  }));

  const formFields = [
    {
      title: 'Regra de cobrança',
      fields: [
        {
          id: 'paymentMethodCode',
          label: 'Forma de pagamento',
          type: 'select',
          value: formData.paymentMethodCode,
          onChange: (value) => setField('paymentMethodCode', value),
          options: paymentMethodOptions,
          placeholder: 'Selecione a forma de pagamento',
          required: true,
          size: 'half-width-large',
        },
        {
          id: 'gatewayId',
          label: 'Gateway',
          type: 'select',
          value: formData.gatewayId,
          onChange: (value) => setField('gatewayId', value),
          options: gatewayOptions,
          placeholder: 'Selecione o gateway',
          required: true,
          size: 'half-width-medium',
        },
      ],
    },
  ];

  return (
    <GenericModal
      isOpen={true}
      title={editingBillingRule ? 'Editar regra de cobrança' : 'Cadastrar regra de cobrança'}
      formFields={formFields}
      onSubmit={handleSaveBillingRule}
      onCancel={handleCancel}
      submitButtonText={editingBillingRule ? 'Salvar' : 'Adicionar'}
      width="760px"
    />
  );
};