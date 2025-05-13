import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";

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
                const { data } = await axiosInstance.get("/categories");
                setCategories(data);
            } catch (err) {
                setError(err?.response?.data?.message || "Erro ao buscar categorias");
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const addCategory = async (category) => {
        try {
            const { data: newCategory } = await axiosInstance.post("/categories", category);
            setCategories((prev) => [...prev, newCategory]);
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao adicionar categoria");
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        try {
            await axiosInstance.delete(`/categories/${id}`);
            setCategories((prev) => prev.filter((category) => category.id !== id));
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao deletar categoria");
        }
    };

    const updateCategory = async (id, updatedCategory) => {
        try {
            const { data: updatedData } = await axiosInstance.put(`/categories/${id}`, updatedCategory);
            setCategories((prev) =>
                prev.map((category) =>
                    category.id === id ? { ...category, ...updatedData } : category
                )
            );
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao atualizar categoria");
        }
    };

    return { categories, addCategory, deleteCategory, updateCategory, loading, error };
};
