import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import SweetAlert from "../../Components/Alerts/SweetAlert";

export const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchCategories = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            try {
                const { data: response, status } = await axiosInstance.get("/categories");
                if (response && status >= 200 && status <= 204) {
                    setCategories(response.payload.categories);
                    return;
                }
                throw new Error(`Erro não identificado ao buscar categorias.`)
            } catch (err) {
                const errorMessage = defineErrorMessage(err, 'buscar');
                AlertToast({ icon: 'error', title: errorMessage });
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const addCategory = async (category) => {
        try {
            const { data: response, status } = await axiosInstance.post("/categories", category);
            if (response && status >= 200 && status <= 204) {
                setCategories((prev) => [...prev, response.payload.category]);
                AlertToast({icon: 'success', title: 'Categoria criada com sucesso.'});
                return;
            }
            throw new Error(`Erro não identificado ao adicionar categoria.`);
        } catch (err) {
            const errorMessage = defineErrorMessage(err, 'adicionar');
            AlertToast({ icon: 'error', title: errorMessage });
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const { data: response, status } = await axiosInstance.delete(`/categories/${id}`);
            if (response.payload.success && status >= 200 && status <= 204) {
                setCategories((prev) => prev.filter((category) => category.id !== id));
                AlertToast({ icon: 'success', title: 'Categoria excluída com sucesso' });
                return;
            }
            throw new Error(`Erro não identificado ao atualizar categoria.`)
        } catch (err) {
            const errorMessage = defineErrorMessage(err, 'deletar');
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        }
    }
    
    const updateCategory = async (id, updatedCategory) => {
        try {
            const { data: response, status } = await axiosInstance.put(`/categories/${id}`, updatedCategory);
            if (response && status >= 200 && status <= 204) {
                setCategories((prev) =>
                    prev.map((category) =>
                        category.id === id ? { ...category, ...response.payload.category } : category
                    )
                );
                AlertToast({ icon: 'success', title: `Categoria atualizada com sucesso.` });
                return;
            }
            throw new Error(`Erro não identificado ao atualizar categoria.`)
        } catch (err) {
            const errorMessage = defineErrorMessage(err, 'atualizar');
            AlertToast({ icon: 'error', title: errorMessage })
            setError(err?.response?.data?.message || "Erro ao atualizar categoria");
        }
    };

    const defineErrorMessage = (err, operation) => {
        if (err?.response?.data?.message) {
            return `Ocorreu um erro ao ${operation} categoria: ${err.response.data.message}.`;
        }

        return `Ocorreu um erro ao ${operation} categoria.` ;
    }

    return { categories, addCategory, deleteCategory, updateCategory, loading, error };
};
