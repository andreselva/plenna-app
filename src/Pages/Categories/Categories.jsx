import Modal from "../../Modals/ModalCategories/ModalCategories";
import CategoryTable from "../../Tables/CategoryTable/CategoryTable";
import { useCategoryHandler } from '../../Handlers/useCategoryHandler';
import globalStyles from '../../Styles/GlobalStyles.module.css'
import { useEffect, useRef, useState } from "react";
import SearchInput from "../../Components/Filters/SearchInput";
import FilterDropdown from "../../Components/Filters/FilterDropdown";
import { FilterIcon } from "lucide-react";
import ModalSubcategories from "../../Modals/ModalCategories/ModalSubcategories";
import SubcategorySidebar from "../../Components/Sidebar/SubcategorySidebar";

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
        handleAddSubcategory,
        loading,
        error,
        setCategoryKind,
        isModalSubcategoryOpen,
        setIsModalSubcategoryOpen,
        parentCategory,  
        openSubSidebar,
        closeSubSidebar,
        isSubSidebarOpen,
        sidebarCategory,
        handleUpdateSubcategory,
        handleDeleteSubcategory,
    } = useCategoryHandler();

    const [filteredCategories, setFilteredCategories] = useState(categories);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState({}); 
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    
    const filterIconRef = useRef(null);

    const dropdownFilterConfig = [
        {
            name: 'type',
            label: 'Filtrar por Tipo',
            type: 'select',
            placeholder: 'Ambos os tipos',
            options: [
                { value: 'Receita', label: 'Receita' },
                { value: 'Despesa', label: 'Despesa' },
            ]
        }
    ];

    useEffect(() => {
        let items = [...categories];

        if (searchQuery) {
            items = items.filter(cat =>
                cat.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (activeFilters.type) {
            items = items.filter(cat => cat.type === activeFilters.type);
        }

        setFilteredCategories(items);
    }, [categories, searchQuery, activeFilters]);

    return (
        <div className={globalStyles.container}>
            <div className={globalStyles['container-content']}>
                <div className={globalStyles['content-title']}>
                    <div className={globalStyles['content-title-items']}>
                        <div className={globalStyles['content-title-items-left']}>
                            <button className={globalStyles['title-items-button']} onClick={() => setIsModalOpen(true)} />
                            <span className={globalStyles['title-items-span']}>Categorias</span>
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
                                placeholder=""
                                onSearchChange={setSearchQuery}
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
                    <CategoryTable
                        categories={filteredCategories}
                        onEdit={handleEditCategory}
                        onDelete={handleDeleteCategory}
                        onAddSubcategory={handleAddSubcategory}
                        onViewSubcategories={openSubSidebar}
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
                    setCategoryKind={setCategoryKind}
                />
            )}

            {isModalSubcategoryOpen && (
                <ModalSubcategories
                setIsModalOpen={setIsModalSubcategoryOpen}
                onSubmit={handleSaveCategory}
                newCategory={newCategory}
                setNewCategory={setNewCategory}
                categoryColor={categoryColor}
                setCategoryColor={setCategoryColor}
                parentCategory={parentCategory}
                />
            )}

            <SubcategorySidebar
                isOpen={isSubSidebarOpen}
                onClose={closeSubSidebar}
                parentCategory={sidebarCategory}
                onUpdateSubcategory={handleUpdateSubcategory}
                onDeleteSubcategory={handleDeleteSubcategory}
                loading={loading}
            />
            
        </div>
    );
};

export default Categories;