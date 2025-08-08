import { useState } from 'react';
import styles from './Expenses.module.css';
import ExpenseTable from "../../Tables/ExpenseTable/ExpenseTable";
import { useExpenseHandler } from '../../Handlers/useExpenseHandler';
import ModalExpenses from "../../Modals/ModalExpenses/ModalExpenses";
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal.tsx';
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { ReversePaymentModal } from '../../Modals/PaymentModal/ReversePaymentModal';
import { PaymentModal } from '../../Modals/PaymentModal/PaymentModal';

const Expenses = () => {
    const [formattedPeriod, setFormattedPeriod] = useState(() => getStartAndEndOfMonth());
    const [selectedMonth, setSelectedMonth] = useState(() => {
        const now = new Date();
        const nextMonthDate = new Date(now);
        nextMonthDate.setMonth(now.getMonth() + 1);
        return nextMonthDate;
    });
    const [selectedRange, setSelectedRange] = useState(null);

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        setSelectedRange(null);

        const formattedMonthRange = getStartAndEndOfMonth(month);
        setFormattedPeriod(formattedMonthRange);
    };

    const handleDateRangeSelect = ({ startDate, endDate }) => {
        setSelectedRange({ startDate, endDate });

        const formattedRange = getFormattedDateRange(startDate, endDate);
        setFormattedPeriod(formattedRange);
    };

    const {
        expenses, categories, newExpense, setNewExpense, expenseValue, setExpenseValue, expenseInvoiceDueDate, setExpenseInvoiceDueDate,
        selectedCategory, setSelectedCategory, isModalOpen, setIsModalOpen, setEditingExpense, handleEditExpense, handleSaveExpense,
        handleDeleteExpense, accounts, selectedCard, setSelectedCard, installments, setInstallments, typeOfInstallment, setTypeOfInstallment,
        hasInstallments, setHasInstallments, hasSourceAccountId, setBooleanSourceAccountId, idExpense, setIdExpense, linkToInvoice, setLinkToInvoice,
        idInvoice, setIdInvoice, status, setStatus, optionsStatus, handleRegisterPayment, isPaymentModalOpen, setIsPaymentModalOpen, loading, error,
        refetch
    } = useExpenseHandler(formattedPeriod);

    const [selectedExpense, setSelectedExpense] = useState(null);
    const handleOpenPaymentModal = (expense) => {
        setSelectedExpense(expense);
        setIsPaymentModalOpen(true);
    };

    const [isReverseModalOpen, setIsReverseModalOpen] = useState(false);
    const [selectedExpenseForReverse, setSelectedExpenseForReverse] = useState(null);

    const handleOpenReverseModal = (expense) => {
        setSelectedExpenseForReverse(expense);
        setIsReverseModalOpen(true);
    };

    const handleCloseReverseModal = () => {
        setIsReverseModalOpen(false);
    };

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
                    <CustomDatePicker
                        onMonthChange={handleMonthChange}
                        onDateRangeSelect={handleDateRangeSelect}
                        selectedMonth={selectedMonth}
                        selectedRange={selectedRange}
                    />
                </div>
                <div className={styles['card-expenses']}>
                    <h3>Despesas</h3>
                    <ExpenseTable
                        expenses={expenses}
                        categories={categories}
                        creditCards={accounts}
                        onEdit={handleEditExpense}
                        onDelete={handleDeleteExpense}
                        onPayment={handleOpenPaymentModal}
                        onReversePayment={handleOpenReverseModal}
                        loading={loading}
                        error={error}
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
                    linkToInvoice={linkToInvoice}
                    setLinkToInvoice={setLinkToInvoice}
                    idInvoice={idInvoice}
                    setIdInvoice={setIdInvoice}
                    status={status}
                    setStatus={setStatus}
                    optionsStatus={optionsStatus}
                />
            )}

            {isPaymentModalOpen && selectedExpense && (
                <PaymentModal
                    payableItem={selectedExpense}
                    payableType="expense"
                    setIsModalPaymentOpen={setIsPaymentModalOpen}
                    handlePayment={handleRegisterPayment}
                    refetch={refetch}
                />
            )}

            {isReverseModalOpen && (
                <ReversePaymentModal
                    isOpen={isReverseModalOpen}
                    onClose={handleCloseReverseModal}
                    entityType="expense"
                    entityData={selectedExpenseForReverse}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default Expenses;
