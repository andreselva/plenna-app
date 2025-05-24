import styles from './Categories.module.css';
import Modal from "../../Modals/ModalCategories/ModalCategories";
import CategoryTable from "../../Tables/CategoryTable/CategoryTable";
import { BotaoGlobal } from '../../Components/Buttons/ButtonGlobal.tsx';
import { useCategoryHandler } from '../../Handlers/useCategoryHandler';

const Categories = () => {
    const { categories, isModalOpen, setIsModalOpen, editingCategory, setEditingCategory, newCategory, setNewCategory, categoryType, setCategoryType, categoryColor, setCategoryColor, handleEditCategory, handleSaveCategory, handleDeleteCategory } = useCategoryHandler();

    return (
        <div className={styles.Categories}>
            <div className={styles['Categories-content']}>
                <BotaoGlobal
                    cor="primaria"
                    className={styles['show-categories-btn']}
                    onClick={() => setIsModalOpen(true)}
                    width='160px'
                    height='40px'
                    margin='0 0 10px 0'
                >
                    Cadastrar categoria
                </BotaoGlobal>

                <div className={styles['card-categories']}>
                    <h3>Categorias</h3>

                    <CategoryTable
                        categories={categories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                    />
                </div>
            </div>

            {isModalOpen && (
                <Modal
                    setIsModalOpen={setIsModalOpen}
                    handleAddCategory={handleSaveCategory}
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    categoryType={categoryType}
                    setCategoryType={setCategoryType}
                    categoryColor={categoryColor}
                    setCategoryColor={setCategoryColor}
                    setEditingCategory={setEditingCategory}
                    editingCategory={editingCategory}
                />
            )}
        </div>
    );
};

export default Categories;