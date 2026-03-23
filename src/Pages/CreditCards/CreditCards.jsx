import { useCreditCardHandler } from '../../Handlers/useCreditCardHandler.jsx';
import { useInvoiceHandler } from '../../Handlers/useInvoiceHandler.jsx';
import { ModalCreditCards } from '../../Modals/ModalCreditCards/ModalCreditCards.jsx';
import { CreditCardsTable } from '../../Tables/CreditCards/CreditCardsTable.jsx';
import globalStyles from '../../Styles/GlobalStyles.module.css';

export const CreditCards = () => {
  const {
    creditCards,
    newAccount,
    setNewAccount,
    isModalOpen,
    setIsModalOpen,
    editingAccount,
    setEditingAccount,
    handleEditAccount,
    handleSaveAccount,
    handleDeleteAccount,
    generateInvoice,
    setGenerateInvoice,
    dueDate,
    setDueDate,
    closingDate,
    setClosingDate,
    loading,
    error,
  } = useCreditCardHandler();

  const { handleGenerateInvoices } = useInvoiceHandler();

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <button className={globalStyles['title-items-button']} onClick={() => setIsModalOpen(true)} />
              <span className={globalStyles['title-items-span']}>Cartões de Crédito</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <CreditCardsTable
            creditCards={creditCards}
            onEdit={handleEditAccount}
            onDelete={handleDeleteAccount}
            generateInvoices={handleGenerateInvoices}
            loading={loading}
            error={error}
          />
        </div>
      </div>
      {isModalOpen && (
        <ModalCreditCards
          setIsModalOpen={setIsModalOpen}
          handleAddAccount={handleSaveAccount}
          setNewAccount={setNewAccount}
          newAccount={newAccount}
          setEditingAccount={setEditingAccount}
          editingAccount={editingAccount}
          generateInvoice={generateInvoice}
          setGerenateInvoice={setGenerateInvoice}
          dueDate={dueDate}
          setDueDate={setDueDate}
          closingDate={closingDate}
          setClosingDate={setClosingDate}
        />
      )}
    </div>
  );
};
