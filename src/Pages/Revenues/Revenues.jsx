import styles from './Revenues.module.css';
import RevenueTable from "../../Tables/RevenueTable/RevenueTable";
import ModalRevenues from "../../Modals/ModalRevenues/ModalRevenues";
import { CategoryManager } from "../../Hooks/CategoryManager/CategoryManager";
import { useRevenueHandler } from '../../Hooks/Handlers/useRevenuesHandler';
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal.tsx';

const Revenues = () => {
    const {
        revenues,
        selectedCategory,
        setSelectedCategory,
        isModalOpen,
        setIsModalOpen,
        setEditingRevenue,
        newRevenue,
        setNewRevenue,
        revenueDescription,
        setRevenueDescription,
        revenueValue,
        setRevenueValue,
        revenueInvoiceDueDate,
        setRevenueInvoiceDueDate,
        handleEditRevenue,
        handleSaveRevenue,
        handleDeleteRevenue
    } = useRevenueHandler();

    const { categories } = CategoryManager();

    return (
        <div className={styles.Revenues}>
            <div className={styles['Revenues-content']}>
                <BotaoGlobal className={styles['show-revenues-btn']} onClick={() => setIsModalOpen(true)}>
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
                    revenueDescription={revenueDescription}
                    setRevenueDescription={setRevenueDescription}
                    revenueValue={revenueValue}
                    setRevenueValue={setRevenueValue}
                    revenueInvoiceDueDate={revenueInvoiceDueDate}
                    setRevenueInvoiceDueDate={setRevenueInvoiceDueDate}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    setEditingRevenue={setEditingRevenue}
                />
            )}
        </div>
    );
};

export default Revenues;
