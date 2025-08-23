import { useBankAccountHandler } from "../../Handlers/useBankAccountHandler.jsx";
import { useInvoiceHandler } from "../../Handlers/useInvoiceHandler.jsx";
import { ModalBankAccounts } from "../../Modals/ModalBankAccounts/ModalBankAccounts.jsx";
import { BankAccountsTable } from "../../Tables/BankAccounts/BankAccountsTable.jsx";
import globalStyles from '../../Styles/GlobalStyles.module.css';

export const BankAccounts = () => {
    const {
        accounts,
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
        error
    } = useBankAccountHandler();

    const { handleGenerateInvoices } = useInvoiceHandler();

    return (
        <div className={globalStyles.container} >
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <div className={globalStyles['content-title-items-left']}>
                            <button className={globalStyles['title-items-button']} onClick={() => setIsModalOpen(true)} />
                            <span className={globalStyles['title-items-span']}>Contas Bancárias</span>
                        </div>
                    </div>
                </div>

                <div className={globalStyles.card}>
                    <BankAccountsTable
                        accounts={accounts}
                        onEdit={handleEditAccount}
                        onDelete={handleDeleteAccount}
                        generateInvoices={handleGenerateInvoices}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>
            {isModalOpen && (
                <ModalBankAccounts
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
        </div >
    );
}