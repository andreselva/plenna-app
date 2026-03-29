import GenericModal from '../../Components/GenericModal/GenericModal';
import { gatewayFormSchemas } from '../../Configs/gatewayFormSchemas';

export const ModalGateways = ({
  setIsModalOpen,
  handleSaveGateway,
  handleIntegrationAction,
  getIntegrationActionLabel,
  setEditingGateway,
  editingGateway,
  formData,
  setField,
  resetForm,
  gatewayOptions,
  loading,
}) => {
  const handleCancel = () => {
    resetForm();
    setEditingGateway(null);
    setIsModalOpen(false);
  };

  const selectedGatewaySchema = gatewayFormSchemas[formData.gateway] || null;

  const dynamicSections =
    selectedGatewaySchema?.sections?.map((section) => ({
      title: section.title,
      fields: section.fields.map((field) => ({
        ...field,
        value: formData[field.id] ?? '',
        onChange: (value) => setField(field.id, value),
      })),
    })) || [];

  const formFields = [
    {
      title: 'Geral',
      fields: [
        {
          id: 'name',
          label: 'Nome',
          type: 'text',
          value: formData.name,
          onChange: (value) => setField('name', value),
          placeholder: 'Ex: Pagar.me Produção',
          required: true,
          size: 'half-width-large',
        },
        {
          id: 'gateway',
          label: 'Gateway',
          type: 'select',
          value: formData.gateway,
          onChange: (value) => setField('gateway', value),
          options: gatewayOptions,
          placeholder: 'Selecione um gateway',
          required: true,
          size: 'half-width-medium',
          disabled: !!editingGateway,
        },
      ],
    },
    {
      title: 'Status',
      fields: [
        {
          id: 'isActive',
          label: 'Integração ativa?',
          type: 'toggle',
          value: formData.isActive,
          onChange: (value) => setField('isActive', value),
          size: 'half-width-medium',
        },
      ],
    },
    ...dynamicSections,
  ];

  return (
    <GenericModal
      isOpen={true}
      title={editingGateway ? 'Editar gateway' : 'Cadastrar gateway'}
      formFields={formFields}
      onSubmit={handleSaveGateway}
      onCancel={handleCancel}
      submitButtonText={editingGateway ? 'Salvar' : 'Adicionar'}
      width="760px"
      loading={loading}
      extraActionButton={{
        text: getIntegrationActionLabel(),
        onClick: handleIntegrationAction,
        disabled: !formData.gateway,
        visible: true,
      }}
    />
  );
};