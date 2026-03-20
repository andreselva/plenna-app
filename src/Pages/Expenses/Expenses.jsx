import { useEffect, useRef, useState } from 'react';
import { Filter as FilterIcon } from 'lucide-react';
import ExpenseTable from "../../Tables/ExpenseTable/ExpenseTable";
import { useExpenseHandler } from '../../Handlers/useExpenseHandler';
import ModalExpenses from "../../Modals/ModalExpenses/ModalExpenses";
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { ReversePaymentModal } from '../../Modals/PaymentModal/ReversePaymentModal';
import { PaymentModal } from '../../Modals/PaymentModal/PaymentModal';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import SearchInput from '../../Components/Filters/SearchInput';
import FilterDropdown from '../../Components/Filters/FilterDropdown';

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
        handleDeleteExpense, creditCards, selectedCard, setSelectedCard, installments, setInstallments, typeOfInstallment, setTypeOfInstallment,
        hasInstallments, setHasInstallments, hasSourceAccountId, setBooleanSourceAccountId, idExpense, setIdExpense, linkToInvoice, setLinkToInvoice,
        idInvoice, setIdInvoice, status, setStatus, optionsStatus, handleRegisterPayment, isPaymentModalOpen, setIsPaymentModalOpen, loading, error,
        refetch, selectedSubcategory, setSelectedSubcategory
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

    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filterIconRef = useRef(null);

    const statusOptions = {pending: 'Pendente', paid: 'Paga', partial: 'Parcial', cancelled: 'Cancelada'};

    const dropdownFilterConfig = [
        {
            name: 'status',
            label: 'Filtrar por Status',
            type: 'select',
            placeholder: 'Todos os Status',
            options: Object.keys(statusOptions).map(key => ({
                value: key,
                label: statusOptions[key]
            }))
        },
        {
            name: 'categoryId',
            label: 'Filtrar por Categoria',
            type: 'select',
            placeholder: 'Todas as Categorias',
            options: categories
                    .filter((category) => category.type.toUpperCase() === 'DESPESA')
                    .map(cat => ({ value: cat.id, label: cat.name }))
        },
        {
            name: 'accountId',
            label: 'Filtrar por cartão de crédito',
            type: 'select',
            placeholder: 'Todos os cartões',
            options: creditCards
                    .map(creditCard => ({value: creditCard.id, label: creditCard.name}))
        }
    ];

    useEffect(() => {
        let items = [...expenses];

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            items = items.filter(expense => {
                const expenseValueString = String(expense.value);
                const expenseDueDateString = String(expense.invoiceDueDate.split('-').reverse().join('/'));
                
                return (
                    expense.name.toLowerCase().includes(lowerCaseQuery) ||
                    expenseValueString.toLowerCase().includes(lowerCaseQuery) ||
                    expenseDueDateString.toLowerCase().includes(lowerCaseQuery)
                );
            }
            );
        }

        if (activeFilters.status) {
            items = items.filter(expense => expense.status === activeFilters.status);
        }
        
        if (activeFilters.categoryId) {
            items = items.filter(expense => expense.idCategory === Number(activeFilters.categoryId));
        }

        if (activeFilters.accountId) {
            items = items.filter(expense => expense.idCreditCard  === Number(activeFilters.accountId))
        }

        setFilteredExpenses(items);
    }, [expenses, searchQuery, activeFilters]);

    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <div className={globalStyles['content-title-items-left']}>
                            <button className={globalStyles['title-items-button']} onClick={() => setIsModalOpen(true)} />
                            <span className={globalStyles['title-items-span']}>Despesas</span>
                        </div>
                        <div className={globalStyles['content-title-items-right']}>
                            <button 
                                ref={filterIconRef}
                                className={`${globalStyles['icon-button']} ${Object.keys(activeFilters).length > 0 ? globalStyles['active'] : ''}`} 
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                <FilterIcon size={20} />
                            </button>
                            <SearchInput 
                                placeholder="Procurar..."
                                onSearchChange={setSearchQuery}
                            />
                            <CustomDatePicker
                                onMonthChange={handleMonthChange}
                                onDateRangeSelect={handleDateRangeSelect}
                                selectedMonth={selectedMonth}
                                selectedRange={selectedRange}
                            />
                        </div>
                    </div>
                </div>

                <FilterDropdown 
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    anchorEl={filterIconRef.current}
                    filterConfig={dropdownFilterConfig}
                    onApplyFilters={setActiveFilters}
                    onClearFilters={() => setActiveFilters({})}
                    align="right"
                />

                <div className={globalStyles.card}>
                    <ExpenseTable
                        expenses={filteredExpenses}
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
                    selectedSubcategory={selectedSubcategory}
                    setSelectedSubcategory={setSelectedSubcategory}
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