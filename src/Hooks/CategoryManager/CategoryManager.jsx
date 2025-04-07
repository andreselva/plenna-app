import { useState, useEffect, useRef } from "react";
const apiUrl = "http://localhost:8000/categories";

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
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Erro ao buscar categorias");
                }

                const data = await response.json();
                setCategories(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const addCategory = async (category) => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar categoria");
            }
            
            const newCategory = await response.json();

            setCategories((prev) => [...prev, newCategory]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteCategory = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Erro ao deletar categoria");
            }
            setCategories((prev) => prev.filter((category) => category.id !== id));
        } catch (err) {
            setError(err.message);
        }
    }

    const updateCategory = async (id, updatedCategory) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedCategory),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar categoria!");
            }

            const updatedData = await response.json();

            setCategories(prev =>
                prev.map(category => category.id === id ? { ...category, ...updatedData } : category)
            );

        } catch (err) {
            setError(err.message);
        }
    };

    return { categories, addCategory, deleteCategory, updateCategory, loading, error };
};
