import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";

const endpoint = "/categories";

export const CategoryManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchCategories = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;
            setLoading(true);

            try {
                const { data: response, status } = await axiosInstance.get(endpoint);
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
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.post(endpoint, category);
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
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.delete(`${endpoint}/${id}`);
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
        } finally {
            setLoading(false);
        }
    }
    
    const updateCategory = async (id, updatedCategory) => {
        try {
            setLoading(true);
            const { data: response, status } = await axiosInstance.put(`${endpoint}/${id}`, updatedCategory);
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
        } finally {
            setLoading(false);
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
