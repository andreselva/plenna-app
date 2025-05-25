import { BotaoGlobal } from "../../Components/Buttons/ButtonGlobal.tsx";
import { useBankAccountHandler } from "../../Handlers/useBankAccountHandler.jsx";
import { ModalBankAccounts } from "../../Modals/ModalBankAccounts/ModalBankAccounts.jsx";
import { BankAccountsTable } from "../../Tables/BankAccounts/BankAccountsTable.jsx";
import styles from './BankAccounts.module.css';

export const BankAccounts = () => {
    const { accounts, newAccount, setNewAccount, isModalOpen, setIsModalOpen, editingAccount, setEditingAccount, handleEditAccount, handleSaveAccount, handleDeleteAccount, generateInvoice, setGenerateInvoice, dueDate, setDueDate, closingDate, setClosingDate } = useBankAccountHandler();

    return (
        <div className={styles.BankAccounts} >
            <div className={styles['BankAccounts-content']}>
                <BotaoGlobal
                    cor="primaria"
                    className={styles['show-btn']}
                    onClick={() => setIsModalOpen(true)}
                    width='100px'
                    height='40px'
                    margin='0 0 10px 0'
                >
                    Incluir
                </BotaoGlobal>

                <div className={styles['card-bank-accounts']}>
                    <h3>Contas bancárias</h3>
                    <BankAccountsTable
                        accounts={accounts}
                        onEdit={handleEditAccount}
                        onDelete={handleDeleteAccount}
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
            )
            }
        </div >
    );


}