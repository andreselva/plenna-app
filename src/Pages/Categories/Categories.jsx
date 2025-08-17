import Modal from "../../Modals/ModalCategories/ModalCategories";
import CategoryTable from "../../Tables/CategoryTable/CategoryTable";
import { useCategoryHandler } from '../../Handlers/useCategoryHandler';
import globalStyles from '../../Styles/GlobalStyles.module.css'

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
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <button className={globalStyles['title-items-button']} onClick={() => setIsModalOpen(true)} />
                        <span className={globalStyles['title-items-span']}>Categorias</span>
                    </div>
                </div>
                <div className={globalStyles.card}>
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