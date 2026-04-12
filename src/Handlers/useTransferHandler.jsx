import { useState } from "react";
import { useBankAccounts } from "../Hooks/BankAccountsManager/useBankAccounts";
import { useTransfers } from "../Hooks/TransferManager/useTransfers";
import { getLocalISODate } from "../Utils/DateUtils";
import AlertToast from "../Components/Alerts/AlertToast";

const EMPTY_TRANSFER = {
  originAccount: "",
  targetAccount: "",
  amount: "",
  transferDate: getLocalISODate(),
};

export const useTransferHandler = () => {
  const { transfers, addTransfer, revertTransfer, refetch, loading: transferLoading, error } = useTransfers();
  const { accounts, loading: accountsLoading } = useBankAccounts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(EMPTY_TRANSFER);

  const [isRevertModalOpen, setIsRevertModalOpen] = useState(false);
  const [transferToRevert, setTransferToRevert] = useState(null);
  const [revertDate, setRevertDate] = useState("");

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

    if (result) {
      resetForm();
      setIsModalOpen(false);
    }
  };

  const handleRevertTransfer = (transfer) => {
    setTransferToRevert(transfer);
    setRevertDate(transfer.transferDate ?? getLocalISODate());
    setIsRevertModalOpen(true);
  };

  const handleConfirmRevert = async () => {
    const payload = { ...transferToRevert, amount: Number(transferToRevert.amount), transferDate: revertDate };
    const success = await revertTransfer(payload);
    if (success) {
      setIsRevertModalOpen(false);
      setTransferToRevert(null);
    }
  };

  const handleCloseRevertModal = () => {
    setIsRevertModalOpen(false);
    setTransferToRevert(null);
  };

  return {
    transfers,
    accounts,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    handleSaveTransfer,
    handleRevertTransfer,
    resetForm,
    isRevertModalOpen,
    transferToRevert,
    revertDate,
    setRevertDate,
    handleConfirmRevert,
    handleCloseRevertModal,
    refetch,
    loading,
    error,
  };
};
