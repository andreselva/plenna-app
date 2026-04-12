import { useState } from "react";
import { useBankAccounts } from "../Hooks/BankAccountsManager/useBankAccounts";
import { useTransfers } from "../Hooks/TransferManager/useTransfers";
import { getLocalISODate } from "../Utils/DateUtils";
import AlertConfirm from "../Components/Alerts/AlertConfirm";
import AlertToast from "../Components/Alerts/AlertToast";

const EMPTY_TRANSFER = {
  originAccount: "",
  targetAccount: "",
  amount: "",
  transferDate: getLocalISODate(),
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
    setFormData({ ...EMPTY_TRANSFER, transferDate: getLocalISODate() });
  };

  const validate = () => {
    if (!formData.originAccount) {
      AlertToast({icon: 'info', title: "Selecione a conta bancária de origem."});
      return false;
    }

    if (!formData.targetAccount) {
      AlertToast({ icon: 'info', title: "Selecione a conta de destino" });
      return false;
    }

    if (formData.originAccount === formData.targetAccount) {
      AlertToast({ icon: 'info', title: "A conta de origem e destino não podem ser iguais." });
      return false;
    }

    if (!formData.amount || Number(formData.amount) <= 0) {
      AlertToast({ icon: 'info', title: 'Informe um valor válido para a transferência.' });
      return false;
    }

    if (!formData.transferDate) {
      AlertToast({ icon: 'info', title: 'Informe a data da transferência.' })
      return false;
    }

    return true;
  };

  const normalizePayload = () => ({
    originAccount: Number(formData.originAccount),
    targetAccount: Number(formData.targetAccount),
    amount: Number(formData.amount),
    transferDate: formData.transferDate,
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
    const result = AlertConfirm({
      title: 'Estornar transferência',
      text: 'Deseja estornar essa transferência?',
      icon: 'warning',
      confirmButtonText: 'Sim, estornar'
    })

    if (result.isConfirmed) {
      await deleteTransfer(id);
    }
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
