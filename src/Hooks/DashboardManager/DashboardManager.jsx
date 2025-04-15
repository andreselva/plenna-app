import { useState, useEffect } from "react";

const apiUrl = "http://localhost:8000/dashboard";

export const useDashboardData = () => {
    const [data, setData] = useState({
        saldoData: null,
        gastosPorCategoriaData: null,
        contasVencimentoProximo: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados do dashboard");
                }

                const {
                    saldoAtual,
                    despesasPorCategoria,
                    contasVencendo,
                } = await response.json();

                setData({
                    saldoData: saldoAtual,
                    gastosPorCategoriaData: despesasPorCategoria,
                    contasVencimentoProximo: contasVencendo,
                });
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};