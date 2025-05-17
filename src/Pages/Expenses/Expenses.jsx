import styles from './Expenses.module.css';
import ExpenseTable from "../../Tables/ExpenseTable/ExpenseTable";
import ModalExpenses from "../../Modals/ModalExpenses/ModalExpenses";
import {useExpenseHandler} from '../../Hooks/Handlers/useExpenseHandler';
import {BotaoGlobal} from '../../Components/Buttons/ButtonGlobal.tsx';

const Expenses = () => {
    const {
        expenses,
        categories,
        newExpense,
        setNewExpense,
        expenseValue,
        setExpenseValue,
        expenseInvoiceDueDate,
        setExpenseInvoiceDueDate,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        setEditingExpense,
        handleEditExpense,
        handleSaveExpense,
        handleDeleteExpense,
        accounts,
        selectedCard,
        setSelectedCard,
        installments,
        setInstallments,
        typeOfInstallment,
        setTypeOfInstallment,
        hasInstallments,
        setHasInstallments,
        hasSourceAccountId,
        setBooleanSourceAccountId,
        idExpense,
        setIdExpense
    } = useExpenseHandler();

    return (
        <div className={styles.Expenses}>
            <div className={styles['Expenses-content']}>
                <div className={styles['btn-card']}>
                    <BotaoGlobal
                        cor="primaria"
                        className={styles['show-expenses-btn']}
                        onClick={() => setIsModalOpen(true)}
                        width='160px'
                        height='40px'
                        margin='0 0 10px 0'
                    >
                        Cadastrar despesa
                    </BotaoGlobal>

                </div>
                <div className={styles['card-expenses']}>
                    <h3>Despesas</h3>
                    <ExpenseTable
                        expenses={expenses}
                        categories={categories}
                        creditCards={accounts}
                        onEdit={handleEditExpense}
                        onDelete={handleDeleteExpense}
                    />
                </div>
            </div>

            {isModalOpen && (
                <ModalExpenses
                    setIsModalOpen={setIsModalOpen}
                    handleAddExpense={handleSaveExpense}
                    newExpense={newExpense}
                    setNewExpense={setNewExpense}
                    expenseValue={expenseValue}
                    setExpenseValue={setExpenseValue}
                    expenseInvoiceDueDate={expenseInvoiceDueDate}
                    setExpenseInvoiceDueDate={setExpenseInvoiceDueDate}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setEditingExpense={setEditingExpense}
                    creditCards={accounts}
                    selectedCard={selectedCard}
                    setSelectedCard={setSelectedCard}
                    installments={installments}
                    setInstallments={setInstallments}
                    typeOfInstallment={typeOfInstallment}
                    setTypeOfInstallment={setTypeOfInstallment}
                    hasInstallments={hasInstallments}
                    setHasInstallments={setHasInstallments}
                    hasSourceAccountId={hasSourceAccountId}
                    setBooleanSourceAccountId={setBooleanSourceAccountId}
                    idExpense={idExpense}
                    setIdExpense={setIdExpense}
                />
            )}
        </div>
    );
};

export default Expenses;
