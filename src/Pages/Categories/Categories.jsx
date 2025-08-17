import styles from './Categories.module.css';
import Modal from "../../Modals/ModalCategories/ModalCategories";
import CategoryTable from "../../Tables/CategoryTable/CategoryTable";
import { useCategoryHandler } from '../../Handlers/useCategoryHandler';

const Categories = () => {
    const { 
        categories, 
        isModalOpen, 
        setIsModalOpen, 
        editingCategory, 
        setEditingCategory, 
        newCategory, 
        setNewCategory, 
        categoryType, 
        setCategoryType, 
        categoryColor, 
        setCategoryColor, 
        handleEditCategory, 
        handleSaveCategory, 
        handleDeleteCategory,
        loading,
        error
    } = useCategoryHandler();

    return (
        <div className={styles.Categories}>
            <div className={styles['Categories-content']}>
                <div className={styles['categories-title']}>
                    <div className={styles['categories-title-items']}>
                        <button className={styles['title-items-button']} onClick={() => setIsModalOpen(true)} />
                        <span className={styles['title-items-span']}>Categorias</span>
                    </div>
                </div>
                <div className={styles['card-categories']}>
                    <CategoryTable
                        categories={categories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                        loading={loading}
                        error={error}
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