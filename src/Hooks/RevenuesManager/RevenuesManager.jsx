import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";

export const RevenuesManager = (periodo) => {
    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRevenues = async () => {
            try {
                const { data } = await axiosInstance.get("/revenues", {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                });
                setRevenues(data);
            } catch (err) {
                setError(err?.response?.data?.message || "Erro ao buscar as receitas!");
            } finally {
                setLoading(false);
            }
        };

        fetchRevenues();
    }, [periodo]);

    const addRevenue = async (revenue) => {
        try {
            const { data } = await axiosInstance.post("/revenues", revenue,
                {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                }
            );
            setRevenues(data.revenues);
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao adicionar nova receita!");
        }
    };

    const deleteRevenue = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        try {
            const url = deleteInstallments
                ? `/revenues/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
                : `/revenues/${id}`;

            const { data } = await axiosInstance.delete(url, {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });

            if (data.revenues) {
                setRevenues(data.revenues);
            }
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao excluir receita!");
        }
    };

    const updateRevenue = async (id, updatedRevenue) => {
        try {
            const { data } = await axiosInstance.put(`/revenues/${id}`, updatedRevenue, {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });
            setRevenues(data.revenues);
        } catch (err) {
            setError(err?.response?.data?.message || "Erro ao atualizar receita!");
        }
    };

    return { revenues, addRevenue, deleteRevenue, updateRevenue, loading, error };
};
