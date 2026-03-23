import { useBankAccountHandler } from '../../Handlers/useBankAccountHandler.jsx';
import { ModalBankAccounts } from '../../Modals/ModalBankAccounts/ModalBankAccounts.jsx';
import { BankAccountsTable } from '../../Tables/BankAccounts/BankAccountsTable.jsx';
import globalStyles from '../../Styles/GlobalStyles.module.css';

export const BankAccounts = () => {
  const {
    accounts,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingAccount,
    setEditingAccount,
    handleEditAccount,
    handleSaveAccount,
    handleDeleteAccount,
    resetForm,
    loading,
    error,
  } = useBankAccountHandler();

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <button className={globalStyles['title-items-button']} onClick={handleOpenModal} />
              <span className={globalStyles['title-items-span']}>Contas Bancárias</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <BankAccountsTable
            accounts={accounts}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      {isModalOpen && (
        <ModalBankAccounts
          setIsModalOpen={setIsModalOpen}
          handleAddAccount={handleSaveAccount}
          setEditingAccount={setEditingAccount}
          editingAccount={editingAccount}
          formData={formData}
          setField={setField}
          resetForm={resetForm}
        />
      )}
    </div>
  );
};
