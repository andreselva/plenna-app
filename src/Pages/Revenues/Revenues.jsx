import styles from './Revenues.module.css';
import RevenueTable from "../../Tables/RevenueTable/RevenueTable";
import ModalRevenues from "../../Modals/ModalRevenues/ModalRevenues";
import { useRevenueHandler } from '../../Hooks/Handlers/useRevenuesHandler';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal.tsx';
import { useState } from 'react';
import { getFormattedDateRange, getStartAndEndOfMonth } from '../../Utils/DateUtils';
import { CustomDatePicker } from '../../Components/DatePicker/DatePicker';

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
        setIdRevenue
    } = useRevenueHandler(formattedPeriod);

    return (
        <div className={styles.Revenues}>
            <div className={styles['Revenues-content']}>
                <div className={styles['btn-card']}>
                    <BotaoGlobal
                        cor="primaria"
                        className={styles['show-revenues-btn']}
                        onClick={() => setIsModalOpen(true)}
                        width='160px'
                        height='40px'
                        margin='0 0 10px 0'
                    >
                        Cadastrar receita
                    </BotaoGlobal>
                    <CustomDatePicker
                        onMonthChange={handleMonthChange}
                        onDateRangeSelect={handleDateRangeSelect}
                        selectedMonth={selectedMonth}
                        selectedRange={selectedRange}
                    />
                </div>
                <div className={styles['card-revenues']}>
                    <h3>Receitas</h3>
                    <RevenueTable
                        revenues={revenues}
                        categories={categories}
                        onEdit={handleEditRevenue}
                        onDelete={handleDeleteRevenue}
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
