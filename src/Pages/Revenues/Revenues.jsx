import { useState } from "react";
import styles from './Revenues.module.css'; // Importando o módulo CSS
import RevenueTable from "../../Tables/RevenueTable/RevenueTable";
import ModalRevenues from "../../Modals/ModalRevenues/ModalRevenues";
import { CategoryManager } from "../../Hooks/CategoryManager/CategoryManager";
import { RevenuesManager } from "../../Hooks/RevenuesManager/RevenuesManager";

const Revenues = () => {
    const { revenues, addRevenue, deleteRevenue, updateRevenue } = RevenuesManager();
    const { categories } = CategoryManager();
    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRevenue, setEditingRevenue] = useState(null);
    const [newRevenue, setNewRevenue] = useState('');
    const [revenueDescription, setRevenueDescription] = useState('');
    const [revenueValue, setRevenueValue] = useState('0');
    const [revenueInvoiceDueDate, setRevenueInvoiceDueDate] = useState('');

    const handleAddRevenue = () => {
        if (!newRevenue.trim()) {
            alert('O nome da receita não pode ser vazio.');
            return;
        }

        addRevenue({
            name: newRevenue,
            description: revenueDescription,
            value: revenueValue,
            invoiceDueDate: revenueInvoiceDueDate,
            idCategory: selectedCategory,
        });

        setNewRevenue('');
        setRevenueDescription('');
        setRevenueValue('0');
        setRevenueInvoiceDueDate('');
        setSelectedCategory(null);
        setIsModalOpen(false);
    };

    const handleEditRevenue = (revenue) => {
        setEditingRevenue(revenue);
        setNewRevenue(revenue.name);
        setRevenueDescription(revenue.description);
        setRevenueValue(revenue.value);
        setRevenueInvoiceDueDate(revenue.invoiceDueDate);
        setSelectedCategory(revenue.idCategory);
        setIsModalOpen(true);
    };

    const handleSaveRevenue = () => {
        if (!newRevenue.trim()) {
            alert('O nome da receita não pode ser vazio.');
            return;
        }

        if (editingRevenue) {
            updateRevenue(editingRevenue.id, {
                name: newRevenue,
                description: revenueDescription,
                value: revenueValue,
                invoiceDueDate: revenueInvoiceDueDate,
                idCategory: selectedCategory,
            });
        } else {
            handleAddRevenue();
        }

        setEditingRevenue(null);
        setNewRevenue('');
        setRevenueDescription('');
        setRevenueValue('0');
        setRevenueInvoiceDueDate('');
        setSelectedCategory('');
        setIsModalOpen(false);
    };

    const handleDeleteRevenue = (id) => {
        deleteRevenue(id);
    };

    return (
        <div className={styles.Revenues}>
            <div className={styles['Revenues-content']}>
                <button className={styles['show-revenues-btn']} onClick={() => setIsModalOpen(true)}>
                    Cadastrar receita
                </button>
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