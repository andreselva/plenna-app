import styles from './Expenses.module.css'; // Importando o módulo CSS
import { useState } from "react";
import ExpenseTable from "../../Tables/ExpenseTable/ExpenseTable";
import ModalExpenses from "../../Modals/ModalExpenses/ModalExpenses";
import { ExpenseManager } from "../../Hooks/ExpenseManager/ExpenseManager";
import { CategoryManager } from "../../Hooks/CategoryManager/CategoryManager";

const Expenses = () => {
    const { expenses, addExpense, deleteExpense, updateExpense } = ExpenseManager();
    const { categories } = CategoryManager();
    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [newExpense, setNewExpense] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseValue, setExpenseValue] = useState('0');
    const [expenseInvoiceDueDate, setExpenseInvoiceDueDate] = useState('');

    const handleAddExpense = () => {
        if (!newExpense.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        addExpense({
            name: newExpense,
            description: expenseDescription,
            value: expenseValue,
            invoiceDueDate: expenseInvoiceDueDate,
            idCategory: selectedCategory,
        });

        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpenseInvoiceDueDate('');
        setSelectedCategory(null);
        setIsModalOpen(false);
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setNewExpense(expense.name);
        setExpenseDescription(expense.description);
        setExpenseValue(expense.value);
        setExpenseInvoiceDueDate(expense.invoiceDueDate);
        setSelectedCategory(expense.idCategory);
        setIsModalOpen(true);
    };

    const handleSaveExpense = () => {
        if (!newExpense.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        if (editingExpense) {
            updateExpense(editingExpense.id, {
                name: newExpense,
                description: expenseDescription,
                value: expenseValue,
                invoiceDueDate: expenseInvoiceDueDate,
                idCategory: selectedCategory,
            });
        } else {
            handleAddExpense();
        }

        setEditingExpense(null);
        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpenseInvoiceDueDate('');
        setSelectedCategory('');
        setIsModalOpen(false);
    };

    const handleDeleteExpense = (id) => {
        deleteExpense(id);
    };

    return (
        <div className={styles.Expenses}>
            <div className={styles['Expenses-content']}>
                <button className={styles['show-expenses-btn']} onClick={() => setIsModalOpen(true)}>
                    Cadastrar despesa
                </button>
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