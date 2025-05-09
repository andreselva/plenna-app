import { useState, useEffect, useRef } from "react";
const apiUrl = "http://localhost:8000/revenues";

export const RevenuesManager = () => {
    const [revenues, setRevenues] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchRevenues = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error("Erro ao buscar as receitas!");
                }

                const data = await response.json();
                setRevenues(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        fetchRevenues();
    }, []);

    const addRevenue = async (revenue) => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(revenue)
            });

            if (!response.ok) {
                throw new Error("Erro ao adicionar nova receita!");
            }

            const newRevenue = await response.json();

            if (newRevenue.length > 1) {
                newRevenue.forEach(revenue => {
                    setRevenues((oldRevenues) => [...oldRevenues, revenue]);
                })
            } else {
                setRevenues((oldRevenues) => [...oldRevenues, newRevenue]);
            }

        } catch (err) {
            setError(err);
        }
    };

    const deleteRevenue = async (id) => {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar categoria");
        }

        setRevenues((oldRevenues) => oldRevenues.filter((revenue) => revenue.id !== id));
    };

    const updateRevenue = async (id, updatedRevenue) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedRevenue),
            });

            if (!response.ok) {
                throw new Error("Erro ao atualizar categoria!");
            }

            const updateRevenues = await response.json();

            // Verifica se updateRevenues é um array ou um único objeto
            if (Array.isArray(updateRevenues)) {
                setRevenues(prev =>
                    prev.map(revenue =>
                        updateRevenues.find(updated => updated.id === revenue.id) || revenue
                    )
                );
            } else {
                setRevenues(prev =>
                    prev.map(revenue =>
                        revenue.id === id ? { ...revenue, ...updateRevenues } : revenue
                    )
                );
            }
        } catch (err) {
            setError(err);
        }
    };

    return { revenues, addRevenue, deleteRevenue, updateRevenue, loading, error };
};
