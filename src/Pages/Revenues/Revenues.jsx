import './Revenues.css';
import {useState} from "react";
import {useCategoryManager} from "../../Hooks/CategoryManager/useCategoryManager";
import {RevenuesManager} from "../../Hooks/RevenuesManager/RevenuesManager";
import RevenueTable from "../../Components/RevenueTable/RevenueTable";
import ModalRevenues from "../../Components/ModalRevenues/ModalRevenues";

const Revenues = () => {
    const {revenues, addRevenue, deleteRevenue, updateRevenue} = RevenuesManager();
    const {categories} = useCategoryManager();
    const [selectedCategory, setSelectedCategory] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRevenue, setEditingRevenue] = useState(null);
    const [newRevenue, setNewRevenue] = useState('');
    const [revenueDescription, setRevenueDescription] = useState('');
    const [revenueValue, setRevenueValue] = useState('0');
    const [revenuePay, setRevenuePay] = useState('');


    const handleAddRevenue = () => {
        if (!newRevenue.trim()) {
            alert('O nome da receita não pode ser vazio.');
            return;
        }

        addRevenue({
            name: newRevenue,
            description: revenueDescription,
            value: revenueValue,
            pay: revenuePay,
            categoryId: selectedCategory,
        });

        setNewRevenue('');
        setRevenueDescription('');
        setRevenueValue('0');
        setRevenuePay('');
        setSelectedCategory(null);
        setIsModalOpen(false);
    };

    const handleEditRevenue = (revenue) => {
        setEditingRevenue(revenue);
        setNewRevenue(revenue.name);
        setRevenueDescription(revenue.description);
        setRevenueValue(revenue.value);
        setRevenuePay(revenue.pay);
        setSelectedCategory(revenue.categoryId);
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
                pay: revenuePay,
                categoryId: selectedCategory,
            });
        } else {
            handleAddRevenue();
        }

        setEditingRevenue(null);
        setNewRevenue('');
        setRevenueDescription('');
        setRevenueValue('0');
        setRevenuePay('');
        setSelectedCategory('');
        setIsModalOpen(false);
    };

    const handleDeleteRevenue = (id) => {
        deleteRevenue(id);
    };

    return (<div className="Revenues">
        <div className="Revenues-content">
            <button className="show-revenues-btn" onClick={() => setIsModalOpen(true)}>
                Cadastrar receita
            </button>
            <div className="card-revenues">
                <h3>Receitas</h3>
                <RevenueTable
                    revenues={revenues}
                    categories={categories}
                    onEdit={handleEditRevenue}
                    onDelete={handleDeleteRevenue}
                />
            </div>
        </div>

        {isModalOpen && (<ModalRevenues
                setIsModalOpen={setIsModalOpen}
                handleAddRevenue={handleSaveRevenue}
                newRevenue={newRevenue}
                setNewRevenue={setNewRevenue}
                revenueDescription={revenueDescription}
                setRevenueDescription={setRevenueDescription}
                revenueValue={revenueValue}
                setRevenueValue={setRevenueValue}
                revenuePay={revenuePay}
                setRevenuePay={setRevenuePay}
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                setEditingRevenue={setEditingRevenue}/>
        )}
    </div>);
}

export default Revenues;