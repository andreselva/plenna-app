import { useEffect, useRef, useState } from 'react';
import { Filter as FilterIcon } from 'lucide-react';
import RevenueTable from "../../Tables/RevenueTable/RevenueTable";
import ModalRevenues from "../../Modals/ModalRevenues/ModalRevenues";
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';
import { useRevenueHandler } from '../../Handlers/useRevenuesHandler';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import SearchInput from '../../Components/Filters/SearchInput';
import FilterDropdown from '../../Components/Filters/FilterDropdown';
import { PaymentModal } from '../../Modals/PaymentModal/PaymentModal';
import { PayableType } from '../../enum/payable-type.enum';
import { usePaymentManager } from '../../Hooks/PaymentManager/usePaymentManager';

const Revenues = () => {
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

    const { registerPayment } = usePaymentManager();

    const {
        revenues, categories, selectedCategory, setSelectedCategory, isModalOpen, setIsModalOpen, setEditingRevenue,
        newRevenue, setNewRevenue, revenueValue, setRevenueValue, revenueInvoiceDueDate, setRevenueInvoiceDueDate,
        handleEditRevenue, handleSaveRevenue, handleDeleteRevenue, typeOfInstallment, setTypeOfInstallment,
        installments, setInstallments, hasInstallments, setHasInstallments, hasSourceAccountId,
        setBooleanSourceAccountId, idRevenue, setIdRevenue, loading, error
    } = useRevenueHandler(formattedPeriod);

    const [filteredRevenues, setFilteredRevenues] = useState(revenues);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({});
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filterIconRef = useRef(null);
    const dropdownFilterConfig = [
        {
            name: 'categoryId',
            label: 'Filtrar por Categoria',
            type: 'select',
            placeholder: 'Todas as Categorias',
            options: categories
                        .filter(category => category.type.toUpperCase() === 'RECEITA')
                        .map(cat => ({ value: cat.id, label: cat.name }))
        }
    ];

    useEffect(() => {
        let items = [...revenues];

        if (searchQuery) {
            const lowerCaseQuery = searchQuery.toLowerCase();
            items = items.filter(revenue => {
                const revenueValueAsString = String(revenue.value);
                const revenueDueString = String(revenue.invoiceDueDate.split('-').reverse().join('/'))

                return (
                    revenue.name.toLowerCase().includes(lowerCaseQuery) ||
                    revenueValueAsString.includes(lowerCaseQuery) ||
                    revenueDueString.includes(lowerCaseQuery)
                );
            });
        }
        
        if (activeFilters.categoryId) {
            items = items.filter(revenue => revenue.idCategory === Number(activeFilters.categoryId));
        }

        setFilteredRevenues(items);
    }, [revenues, searchQuery, activeFilters]);

    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedRevenue, setSelectedRevenue] = useState(null);
    
    const handleOpenPaymentModal = (revenue) => {
        setSelectedRevenue(revenue);
        setIsPaymentModalOpen(true);
    };

    const handleRegisterPayment = (paymentData) => {
        registerPayment(paymentData);
    }

    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <div className={globalStyles['content-title-items-left']}>
                            <button className={globalStyles['title-items-button']} onClick={() => setIsModalOpen(true)} />
                            <span className={globalStyles['title-items-span']}>Receitas</span>
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
                    <RevenueTable
                        revenues={filteredRevenues}
                        categories={categories}
                        onEdit={handleEditRevenue}
                        onDelete={handleDeleteRevenue}
                        loading={loading}
                        error={error}
                        handleOpenPaymentModal={handleOpenPaymentModal}
                    />
                </div>
            </div>

            {isPaymentModalOpen && selectedRevenue && (
                <PaymentModal
                    payableItem={selectedRevenue}
                    payableType={PayableType.REVENUE}
                    setIsModalPaymentOpen={setIsPaymentModalOpen}
                    handlePayment={handleRegisterPayment}
                />
            )}

            {isModalOpen && (
                <ModalRevenues
                    setIsModalOpen={setIsModalOpen}
                    handleAddRevenue={handleSaveRevenue}
                    newRevenue={newRevenue}
                    setNewRevenue={setNewRevenue}
                    revenueValue={revenueValue}
                    setRevenueValue={setRevenueValue}
                    revenueInvoiceDueDate={revenueInvoiceDueDate}
                    setRevenueInvoiceDueDate={setRevenueInvoiceDueDate}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setEditingRevenue={setEditingRevenue}
                    typeOfInstallment={typeOfInstallment}
                    setTypeOfInstallment={setTypeOfInstallment}
                    installments={installments}
                    setInstallments={setInstallments}
                    hasInstallments={hasInstallments}
                    setHasInstallments={setHasInstallments}
                    hasSourceAccountId={hasSourceAccountId}
                    setBooleanSourceAccountId={setBooleanSourceAccountId}
                    idRevenue={idRevenue}
                    setIdRevenue={setIdRevenue}
                />
            )}
        </div>
    );
};

export default Revenues;