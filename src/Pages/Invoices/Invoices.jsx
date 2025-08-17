import { useState } from 'react';
import { CategoryManager } from '../../Hooks/CategoryManager/CategoryManager';
import { useBankAccounts } from '../../Hooks/BankAccountsManager/useBankAccounts';
import { useExpenseHandler } from '../../Handlers/useExpenseHandler';
import { useInvoiceHandler } from '../../Handlers/useInvoiceHandler';
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';
import { PaymentModal } from '../../Modals/PaymentModal/PaymentModal';
import { ReversePaymentModal } from '../../Modals/PaymentModal/ReversePaymentModal';
import ModalExpenses from '../../Modals/ModalExpenses/ModalExpenses';
import InvoiceTable from '../../Tables/InvoiceTable/InvoiceTable';
import globalStyles from '../../Styles/GlobalStyles.module.css';

const Invoices = () => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
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
        handlePayment,
        loading,
        error
    } = useInvoiceHandler(formattedPeriod);

    const fnExpenses = useExpenseHandler(formattedPeriod);

    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <span className={globalStyles['title-items-span']}>Faturas</span>
                    </div>
                    <CustomDatePicker
                        onMonthChange={handleMonthChange}
                        onDateRangeSelect={handleDateRangeSelect}
                        selectedMonth={selectedMonth}
                        selectedRange={selectedRange}
                    />
                </div>
                <div className={globalStyles.card}>
                    <InvoiceTable
                        invoices={invoices}
                        onEdit={fnExpenses.handleEditExpense}
                        onDelete={fnExpenses.handleDeleteExpense}
                        setIsModalOpen={fnExpenses.setIsModalOpen}
                        onOpenPaymentModal={handleOpenPaymentModal}
                        onReversePayment={handleOpenReverseModal}
                        loading={loading}
                        error={error}
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