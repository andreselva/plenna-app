import { useState } from 'react';
import { useBillingRules } from '../Hooks/BillingRulesManager/useBillingRules';

const EMPTY_BILLING_RULE = {
  paymentMethodCode: '',
  gatewayId: '',
};

export const useBillingRuleHandler = () => {
  const {
    billingRules,
    paymentMethods,
    gateways,
    addBillingRule,
    updateBillingRule,
    deleteBillingRule,
    loading,
    supportDataLoading,
    error,
  } = useBillingRules();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBillingRule, setEditingBillingRule] = useState(null);
  const [formData, setFormData] = useState(EMPTY_BILLING_RULE);

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setEditingBillingRule(null);
    setFormData(EMPTY_BILLING_RULE);
  };

  const normalizePayload = () => ({
    paymentMethodCode: String(formData.paymentMethodCode),
    gatewayId: Number(formData.gatewayId),
  });

  const validate = () => {
    if (!formData.paymentMethodCode) {
      alert('Selecione uma forma de pagamento.');
      return false;
    }

    if (!formData.gatewayId) {
      alert('Selecione um gateway.');
      return false;
    }

    return true;
  };

  const handleEditBillingRule = (billingRule) => {
    setEditingBillingRule(billingRule);
    setFormData({
      paymentMethodCode: String(
        billingRule.paymentMethodCode ??
        billingRule.paymentMethod?.code ??
        ''
      ),
      gatewayId: String(
        billingRule.gatewayId ??
        billingRule.gateway?.id ??
        ''
      ),
    });
    setIsModalOpen(true);
  };

  const handleSaveBillingRule = async () => {
    if (!validate()) return;

    const payload = normalizePayload();

    if (editingBillingRule) {
      await updateBillingRule(editingBillingRule.id, payload);
    } else {
      await addBillingRule(payload);
    }

    resetForm();
    setIsModalOpen(false);
  };

  const handleDeleteBillingRule = async (id) => {
    await deleteBillingRule(id);
  };

  return {
    billingRules,
    paymentMethods,
    gateways,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingBillingRule,
    setEditingBillingRule,
    handleEditBillingRule,
    handleDeleteBillingRule,
    handleSaveBillingRule,
    resetForm,
    loading,
    supportDataLoading,
    error,
  };
};