import {useState} from "react";

export const useCategoryManager = () => {
    const [categories, setCategories] = useState([
        {id: 1, name: 'Categoria 1', type: 'Receita', description: 'Descrição 1', color: '#ff0000'},
        {id: 2, name: 'Categoria 2', type: 'Despesa', description: 'Descrição 2', color: '#00ff00'},
        {id: 3, name: 'Categoria 3', type: 'Receita', description: 'Descrição 3', color: '#0000ff'},
        {id: 4, name: 'Categoria 4', type: 'Despesa', description: 'Descrição 4', color: '#ffff00'}
    ]);

    const addCategory = (category) => {
        setCategories(prev => [...prev, {...category, id: prev.length + 1}]);
    };

    const deleteCategory = (id) => {
        setCategories(prev => prev.filter(category => category.id !== id));
    };

    const updateCategory = (id, updatedCategory) => {
        setCategories(prev => prev.map(category => category.id === id ? {...category, ...updatedCategory} : category));
    };

    return {categories, addCategory, deleteCategory, updateCategory};
};
