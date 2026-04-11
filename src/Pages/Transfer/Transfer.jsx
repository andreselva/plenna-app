import { useTransferHandler } from "../../Handlers/useTransferHandler";
import { ModalTransfer } from "../../Modals/ModalTransfer/ModalTransfer";
import globalStyles from "../../Styles/GlobalStyles.module.css";
import { TransferTable } from "../../Tables/Transfer/TransferTable";

const Transfer = () => {
  const {
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
  } = useTransferHandler();

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles["container-content"]}>
        <div className={globalStyles["content-title"]}>
          <div className={globalStyles["content-title-items"]}>
            <div className={globalStyles["content-title-items-left"]}>
              <button
                className={globalStyles["title-items-button"]}
                onClick={handleOpenModal}
              />
              <span className={globalStyles["title-items-span"]}>Transferências</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <TransferTable
            transfers={transfers}
            accounts={accounts}
            onDelete={handleDeleteTransfer}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {isModalOpen && (
        <ModalTransfer
          setIsModalOpen={setIsModalOpen}
          handleSaveTransfer={handleSaveTransfer}
          formData={formData}
          setField={setField}
          resetForm={resetForm}
          accounts={accounts}
        />
      )}
    </div>
  );
};

export default Transfer;
