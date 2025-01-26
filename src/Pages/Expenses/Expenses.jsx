import './Expenses.css';
import {useState} from "react";
import ExpenseTable from "../../Components/ExpenseTable/ExpenseTable";
import ModalExpenses from "../../Components/ModalExpenses/ModalExpenses";
import {useExpenseManager} from "../../Hooks/ExpenseManager/useExpenseManager";
import {useCategoryManager} from "../../Hooks/CategoryManager/useCategoryManager";

const Expenses = () => {
    const {expenses, addExpense, deleteExpense, updateExpense} = useExpenseManager();

    console.log(expenses);
    const {categories} = useCategoryManager();
    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);
    const [newExpense, setNewExpense] = useState('');
    const [expenseDescription, setExpenseDescription] = useState('');
    const [expenseValue, setExpenseValue] = useState('0');
    const [expensePay, setExpensePay] = useState('');


    const handleAddExpense = () => {
        if (!newExpense.trim()) {
            alert('O nome da despesa não pode ser vazio.');
            return;
        }

        addExpense({
            name: newExpense,
            description: expenseDescription,
            value: expenseValue,
            pay: expensePay,
            categoryId: selectedCategory,
        });

        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpensePay('');
        setSelectedCategory('');
        setIsModalOpen(false);
    };


    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setNewExpense(expense.name);
        setExpenseDescription(expense.description);
        setExpenseValue(expense.value);
        setExpensePay(expense.pay);
        setSelectedCategory(expense.categoryId);
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
                pay: expensePay,
                categoryId: selectedCategory,
            });
        } else {
            handleAddExpense();
        }

        setEditingExpense(null);  // Garantir que o estado de edição seja limpo
        setNewExpense('');
        setExpenseDescription('');
        setExpenseValue('0');
        setExpensePay('');
        setSelectedCategory('');
        setIsModalOpen(false);
    };

    const handleDeleteExpense = (id) => {
        deleteExpense(id);
    };

    return (
        <div className="Expenses">
            <div className="Expenses-content">
                <button className="show-expenses-btn" onClick={() => setIsModalOpen(true)}>
                    Cadastrar despesa
                </button>
                <div className="card-expenses">
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
                    expensePay={expensePay}
                    setExpensePay={setExpensePay}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setEditingExpense={setEditingExpense}
                />
            )}
        </div>
    );
}

export default Expenses;