import { useState, useEffect, useRef } from "react";
import axiosInstance from "../../api/axiosInstance";

export const RevenuesManager = () => {
    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchRevenues = async () => {
            if (hasFetched.current) return;
            hasFetched.current = true;

            try {
                const { data } = await axiosInstance.get("/revenues");
                setRevenues(data);
            } catch (err) {
                setError(err?.response?.data?.message || "Erro ao buscar as receitas!");
            } finally {
                setLoading(false);
            }
        };

        fetchRevenues();
    }, []);

    const addRevenue = async (revenue) => {
        try {
            const { data: newRevenue } = await axiosInstance.post("/revenues", revenue);

            if (Array.isArray(newRevenue)) {
                setRevenues((prev) => [...prev, ...newRevenue]);
            } else {
                setRevenues((prev) => [...prev, newRevenue]);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao adicionar nova receita!");
        }
    };

    const deleteRevenue = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        try {
            const url = deleteInstallments
                ? `/revenues/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
                : `/revenues/${id}`;

            const { data } = await axiosInstance.delete(url);

            if (data.revenues) {
                setRevenues(data.revenues);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao excluir receita!");
        }
    };

    const updateRevenue = async (id, updatedRevenue) => {
        try {
            const { data: updatedData } = await axiosInstance.put(`/revenues/${id}`, updatedRevenue);

            if (Array.isArray(updatedData)) {
                setRevenues((prev) =>
                    prev.map((revenue) =>
                        updatedData.find((updated) => updated.id === revenue.id) || revenue
                    )
                );
            } else {
                setRevenues((prev) =>
                    prev.map((revenue) =>
                        revenue.id === id ? { ...revenue, ...updatedData } : revenue
                    )
                );
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao atualizar receita!");
        }
    };

    return { revenues, addRevenue, deleteRevenue, updateRevenue, loading, error };
};
