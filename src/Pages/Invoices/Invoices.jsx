import styles from './Invoices.module.css';
import ModalExpenses from "../../Modals/ModalExpenses/ModalExpenses";
import { useExpenseHandler } from '../../Hooks/Handlers/useExpenseHandler';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal.tsx';
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { useState } from 'react';
import InvoiceTable from '../../Tables/InvoiceTable/InvoiceTable';

const Invoices = () => {
    const invoices = [
        {
            id: 1, name: 'Fatura de Janeiro', invoiceDueDate: '2023-01-31', closingDate: '2023-02-05',
            paymentDate: '2023-02-10', status: 'Paga', value: 1000,
            expenses: [
                { id: 1, name: 'Despesa 1', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 1, name: 'Despesa 1', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
            ]
        },
        {
            id: 2, name: 'Fatura de Fevereiro', invoiceDueDate: '2023-02-28', closingDate: '2023-03-05',
            paymentDate: '2023-03-10', status: 'Pendente', value: 1200,
            expenses: [
                { id: 4, name: 'Despesa 4', value: 600, dueDate: '2023-02-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
                { id: 2, name: 'Despesa 2', value: 500, dueDate: '2023-01-15', },
            ]
        }
    ];

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
    } = useExpenseHandler(formattedPeriod);;

    return (
        <div className={styles.Invoices}>
            <div className={styles['Invoices-content']}>
                <div className={styles['btn-card']}>
                    <BotaoGlobal
                        cor="primaria"
                        className={styles['show-invoices-btn']}
                        onClick={() => setIsModalOpen(true)}
                        width='130px'
                        height='40px'
                        margin='0 0 10px 0'
                    >
                        Criar Fatura
                    </BotaoGlobal>
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

export default Invoices;
