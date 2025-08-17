import { useState } from 'react';
import RevenueTable from "../../Tables/RevenueTable/RevenueTable";
import ModalRevenues from "../../Modals/ModalRevenues/ModalRevenues";
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';
import { useRevenueHandler } from '../../Handlers/useRevenuesHandler';
import globalStyles from '../../Styles/GlobalStyles.module.css';

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

    const {
        revenues,
        categories,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        setEditingRevenue,
        newRevenue,
        setNewRevenue,
        revenueValue,
        setRevenueValue,
        revenueInvoiceDueDate,
        setRevenueInvoiceDueDate,
        handleEditRevenue,
        handleSaveRevenue,
        handleDeleteRevenue,
        typeOfInstallment,
        setTypeOfInstallment,
        installments,
        setInstallments,
        hasInstallments,
        setHasInstallments,
        hasSourceAccountId,
        setBooleanSourceAccountId,
        idRevenue,
        setIdRevenue,
        loading,
        error
    } = useRevenueHandler(formattedPeriod);

    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <button className={globalStyles['title-items-button']} onClick={() => setIsModalOpen(true)} />
                        <span className={globalStyles['title-items-span']}>Receitas</span>
                    </div>
                    <CustomDatePicker
                        onMonthChange={handleMonthChange}
                        onDateRangeSelect={handleDateRangeSelect}
                        selectedMonth={selectedMonth}
                        selectedRange={selectedRange}
                    />
                </div>
                <div className={globalStyles.card}>
                    <RevenueTable
                        revenues={revenues}
                        categories={categories}
                        onEdit={handleEditRevenue}
                        onDelete={handleDeleteRevenue}
                        loading={loading}
                        error={error}
                    />
                </div>
            </div>

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