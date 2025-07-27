import { useState } from 'react';
import styles from './Invoices.module.css';
import InvoiceTable from '../../Tables/InvoiceTable/InvoiceTable';
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { useInvoiceHandler } from '../../Handlers/useInvoiceHandler';
import ModalExpenses from '../../Modals/ModalExpenses/ModalExpenses';
import { useBankAccounts } from '../../Hooks/BankAccountsManager/useBankAccounts';
import { CategoryManager } from '../../Hooks/CategoryManager/CategoryManager';
import { useExpenseHandler } from '../../Handlers/useExpenseHandler';
import { PaymentModal } from '../../Modals/PaymentModal/PaymentModal';
import { ReversePaymentModal } from '../../Modals/PaymentModal/ReversePaymentModal';

const Invoices = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const handleOpenPaymentModal = (invoice) => {
        setSelectedInvoice(invoice);
        setPaymentModalOpen(true);
    };

    const [formattedPeriod, setFormattedPeriod] = useState(() => getStartAndEndOfMonth());
    const { categories } = CategoryManager();
    const { accounts } = useBankAccounts();
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

    const [isReverseModalOpen, setIsReverseModalOpen] = useState(false);
    const [selectedInvoiceForReserve, setSelectedInvoiceForReserve] = useState(null);

    const handleOpenReverseModal = (expense) => {
        setSelectedInvoiceForReserve(expense);
        setIsReverseModalOpen(true);
    };

    const handleCloseReverseModal = () => {
        setIsReverseModalOpen(false);
    };

    const {
        invoices,
        isPaymentModalOpen,
        setPaymentModalOpen,
        handlePayment,
    } = useInvoiceHandler(formattedPeriod);

    const fnExpenses = useExpenseHandler(formattedPeriod);

    return (
        <div className={styles.Invoices}>
            <div className={styles['Invoices-content']}>
                <div className={styles['btn-card']}>
                    <div></div>
                    <CustomDatePicker
                        onMonthChange={handleMonthChange}
                        onDateRangeSelect={handleDateRangeSelect}
                        selectedMonth={selectedMonth}
                        selectedRange={selectedRange}
                    />
                </div>
                <div className={styles['card-invoice']}>
                    <h3>Faturas</h3>
                    <InvoiceTable
                        invoices={invoices}
                        onEdit={fnExpenses.handleEditExpense}
                        onDelete={fnExpenses.handleDeleteExpense}
                        setIsModalOpen={fnExpenses.setIsModalOpen}
                        onOpenPaymentModal={handleOpenPaymentModal}
                        onReversePayment={handleOpenReverseModal}
                    />
                </div>
            </div>

            {fnExpenses.isModalOpen && (
                <ModalExpenses
                    setIsModalOpen={fnExpenses.setIsModalOpen}
                    handleAddExpense={fnExpenses.handleSaveExpense}
                    newExpense={fnExpenses.newExpense}
                    setNewExpense={fnExpenses.setNewExpense}
                    expenseValue={fnExpenses.expenseValue}
                    setExpenseValue={fnExpenses.setExpenseValue}
                    expenseInvoiceDueDate={fnExpenses.expenseInvoiceDueDate}
                    setExpenseInvoiceDueDate={fnExpenses.setExpenseInvoiceDueDate}
                    categories={categories}
                    selectedCategory={fnExpenses.selectedCategory}
                    setSelectedCategory={fnExpenses.setSelectedCategory}
                    setEditingExpense={fnExpenses.setEditingExpense}
                    creditCards={accounts}
                    selectedCard={fnExpenses.selectedCard}
                    setSelectedCard={fnExpenses.setSelectedCard}
                    installments={fnExpenses.installments}
                    setInstallments={fnExpenses.setInstallments}
                    typeOfInstallment={fnExpenses.typeOfInstallment}
                    setTypeOfInstallment={fnExpenses.setTypeOfInstallment}
                    hasInstallments={fnExpenses.hasInstallments}
                    setHasInstallments={fnExpenses.setHasInstallments}
                    hasSourceAccountId={fnExpenses.hasSourceAccountId}
                    setBooleanSourceAccountId={fnExpenses.setBooleanSourceAccountId}
                    idExpense={fnExpenses.idExpense}
                    setIdExpense={fnExpenses.setIdExpense}
                    idInvoice={fnExpenses.idInvoice}
                    setIdInvoice={fnExpenses.setIdInvoice}
                    linkToInvoice={fnExpenses.linkToInvoice}
                    setLinkToInvoice={fnExpenses.setLinkToInvoice}
                    status={fnExpenses.status}
                    setStatus={fnExpenses.setStatus}
                    optionsStatus={fnExpenses.optionsStatus}
                />
            )}

            {isPaymentModalOpen && (
                <PaymentModal
                    payableItem={selectedInvoice}
                    payableType="invoice"
                    setIsModalPaymentOpen={setPaymentModalOpen}
                    handlePayment={handlePayment}
                />
            )}

            {isReverseModalOpen && (
                <ReversePaymentModal
                    isOpen={isReverseModalOpen}
                    onClose={handleCloseReverseModal}
                    entityType="invoice"
                    entityData={selectedInvoiceForReserve}
                />
            )}
        </div>

    );
};

export default Invoices;
