import styles from './Revenues.module.css';
import RevenueTable from "../../Tables/RevenueTable/RevenueTable";
import ModalRevenues from "../../Modals/ModalRevenues/ModalRevenues";
import { useRevenueHandler } from '../../Hooks/Handlers/useRevenuesHandler';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal.tsx';

const Revenues = () => {
    const { revenues, categories, selectedCategory, setSelectedCategory, isModalOpen, setIsModalOpen, setEditingRevenue, newRevenue, setNewRevenue, revenueValue, setRevenueValue, revenueInvoiceDueDate, setRevenueInvoiceDueDate, handleEditRevenue, handleSaveRevenue, handleDeleteRevenue, typeOfInstallment, setTypeOfInstallment, installments, setInstallments } = useRevenueHandler();

    return (
        <div className={styles.Revenues}>
            <div className={styles['Revenues-content']}>
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
                />
            )}
        </div>
    );
};

export default Revenues;
