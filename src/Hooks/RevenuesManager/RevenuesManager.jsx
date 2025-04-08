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
            setRevenues((oldRevenues) => [...oldRevenues, newRevenue]);
        } catch (err) {
            setError(err);
        }
    };

    const deleteRevenue = (id) => {
        setRevenues((oldRevenues) => oldRevenues.filter((revenue) => revenue.id !== id));
    };

    const updateRevenue = (id, updatedRevenue) => {
        setRevenues((oldRevenues) =>
            oldRevenues.map((revenue) => (revenue.id === id ? { ...revenue, ...updatedRevenue } : revenue))
        );
    };

    return { revenues, addRevenue, deleteRevenue, updateRevenue, loading, error };
};
