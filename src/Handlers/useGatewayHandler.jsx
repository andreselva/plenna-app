import { useState } from 'react';
import AlertToast from '../Components/Alerts/AlertToast';
import { gatewayFormSchemas } from '../Configs/gatewayFormSchemas';
import { useGateways } from '../Hooks/GatewaysManager/useGateways';

const EMPTY_GATEWAY = {
  name: '',
  gateway: '',
  isActive: false,
  publicKey: '',
  secretKey: '',
};

export const useGatewayHandler = () => {
  const {
    gateways,
    gatewayOptions,
    addGateway,
    updateGateway,
    deleteGateway,
    testGatewayIntegration,
    loading,
    optionsLoading,
    error,
  } = useGateways();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGateway, setEditingGateway] = useState(null);
  const [formData, setFormData] = useState(EMPTY_GATEWAY);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditingGateway(null);
    setFormData(EMPTY_GATEWAY);
  };

  const getGatewaySchema = () => gatewayFormSchemas[formData.gateway] || null;

  const normalizePayload = () => {
    const schema = getGatewaySchema();
    const config = schema?.normalizeConfig ? schema.normalizeConfig(formData) : {};

    return {
      name: formData.name.trim(),
      gateway: formData.gateway,
      isActive: !!formData.isActive,
      config,
    };
  };

  const validate = () => {
    if (!formData.name.trim()) {
      alert('O nome da integração não pode ser vazio.');
      return false;
    }

    if (!formData.gateway) {
      alert('Selecione um gateway.');
      return false;
    }

    const schema = getGatewaySchema();
    const gatewayValidationError = schema?.validateConfig?.(formData);

    if (gatewayValidationError) {
      alert(gatewayValidationError);
      return false;
    }

    return true;
  };

  const handleEditGateway = (gateway) => {
    setEditingGateway(gateway);
    setFormData({
      name: gateway.name || '',
      gateway: gateway.gateway || '',
      isActive: gateway.isActive ?? false,
      publicKey: gateway.config?.publicKey || '',
      secretKey: gateway.config?.secretKey || '',
    });
    setIsModalOpen(true);
  };

  const handleSaveGateway = async () => {
    if (!validate()) return;

    const payload = normalizePayload();

    if (editingGateway) {
      await updateGateway(editingGateway.id, payload);
    } else {
      await addGateway(payload);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteGateway = async (id) => {
    await deleteGateway(id);
  };

  const handleIntegrationAction = async () => {
    if (!editingGateway?.id) {
      AlertToast({
        icon: 'info',
        title: 'Salve a integração antes de ativar ou testar.',
      });
      return;
    }

    if (formData.isActive) {
      await testGatewayIntegration(editingGateway.id);
      return;
    }

    const payload = normalizePayload();
    const updated = await updateGateway(editingGateway.id, {
      ...payload,
      isActive: true,
    });

    if (updated) {
      setFormData((prev) => ({ ...prev, isActive: true }));
      AlertToast({
        icon: 'success',
        title: 'Integração ativada com sucesso.',
      });
    }
  };

  const getIntegrationActionLabel = () => {
    if (!editingGateway?.id) return 'Ativar integração';
    return formData.isActive ? 'Testar integração' : 'Ativar integração';
  };

  return {
    gateways,
    gatewayOptions,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingGateway,
    setEditingGateway,
    handleEditGateway,
    handleDeleteGateway,
    handleSaveGateway,
    handleIntegrationAction,
    getIntegrationActionLabel,
    resetForm,
    loading,
    optionsLoading,
    error,
  };
};