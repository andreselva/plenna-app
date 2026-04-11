import { useState } from "react";
import { useBankAccounts } from "../Hooks/BankAccountsManager/useBankAccounts";
import { useTransfers } from "../Hooks/TransferManager/useTransfers";
import { getLocalISODate } from "../Utils/DateUtils";

const EMPTY_TRANSFER = {
  accountId: "",
  payableId: "",
  value: "",
  paymentDate: getLocalISODate(),
};

export const useTransferHandler = () => {
  const { transfers, addTransfer, deleteTransfer, loading: transferLoading, error } = useTransfers();
  const { accounts, loading: accountsLoading } = useBankAccounts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_TRANSFER);

  const loading = transferLoading || accountsLoading;

  const setField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({ ...EMPTY_TRANSFER, paymentDate: getLocalISODate() });
  };

  const validate = () => {
    if (!formData.accountId) {
      alert("Selecione a conta bancária de origem.");
      return false;
    }

    if (!formData.payableId) {
      alert("Selecione a conta bancária de destino.");
      return false;
    }

    if (formData.accountId === formData.payableId) {
      alert("A conta de origem e destino não podem ser iguais.");
      return false;
    }

    if (!formData.value || Number(formData.value) <= 0) {
      alert("Informe um valor válido para a transferência.");
      return false;
    }

    if (!formData.paymentDate) {
      alert("Informe a data da transferência.");
      return false;
    }

    return true;
  };

  const normalizePayload = () => ({
    accountId: Number(formData.accountId),
    payableId: Number(formData.payableId),
    value: Number(formData.value),
    paymentDate: formData.paymentDate,
  });

  const handleSaveTransfer = async () => {
    if (!validate()) return;

    const payload = normalizePayload();
    const result = await addTransfer(payload);

    if (result !== null) {
      resetForm();
      setIsModalOpen(false);
    }
  };

  const handleDeleteTransfer = async (id) => {
    await deleteTransfer(id);
  };

  return {
    transfers,
    accounts,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    handleSaveTransfer,
    handleDeleteTransfer,
    resetForm,
    loading,
    error,
  };
};
