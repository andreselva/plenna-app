// Expenses.js
import styles from './Expenses.module.css';
import ExpenseTable from "../../Tables/ExpenseTable/ExpenseTable";
import ModalExpenses from "../../Modals/ModalExpenses/ModalExpenses";
import { useExpenseHandler } from '../../Hooks/Handlers/useExpenseHandler';
import { ReactComponent as CardIcon } from '../../assets/icons/card-outline.svg';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal.tsx';

const Expenses = () => {
    const {
        expenses, categories, newExpense, setNewExpense, expenseDescription, setExpenseDescription,
        expenseValue, setExpenseValue, expenseInvoiceDueDate, setExpenseInvoiceDueDate, selectedCategory,
        setSelectedCategory, isModalOpen, setIsModalOpen, setEditingExpense, handleEditExpense, handleSaveExpense, handleDeleteExpense
    } = useExpenseHandler();

    return (
        <div className={styles.Expenses}>
            <div className={styles['Expenses-content']}>
                <div className={styles['btn-card']}>
                    <BotaoGlobal cor="primaria" className={styles['show-expenses-btn']} onClick={() => setIsModalOpen(true)}>
                        Cadastrar despesa
                    </BotaoGlobal>
                    <BotaoGlobal cor="secundaria" icone={<CardIcon className={styles['icon']} />} />

                </div>
                <div className={styles['card-expenses']}>
                    <h3>Despesas</h3>
                    <ExpenseTable
                        expenses={expenses}
                        categories={categories}
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
                    expenseDescription={expenseDescription}
                    setExpenseDescription={setExpenseDescription}
                    expenseValue={expenseValue}
                    setExpenseValue={setExpenseValue}
                    expenseInvoiceDueDate={expenseInvoiceDueDate}
                    setExpenseInvoiceDueDate={setExpenseInvoiceDueDate}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setEditingExpense={setEditingExpense}
                />
            )}
        </div>
    );
};

export default Expenses;
