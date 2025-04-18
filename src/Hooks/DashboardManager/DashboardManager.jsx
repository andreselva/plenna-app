import { useState, useEffect, useRef } from "react";

const apiUrl = "http://localhost:8000/dashboard";

export const useDashboardData = () => {
    const [data, setData] = useState({
        saldoData: null,
        gastosPorCategoriaData: null,
        contasVencimentoProximo: [],
        evolucaoMensal: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchData = async () => {
            if (hasFetched.current) return;

            hasFetched.current = true;  
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados do dashboard");
                }

                const {
                    saldoAtual,
                    despesasPorCategoria,
                    contasVencendo,
                    evolucaoMensal,
                } = await response.json();

                setData({
                    saldoData: saldoAtual,
                    gastosPorCategoriaData: despesasPorCategoria,
                    contasVencimentoProximo: contasVencendo,
                    evolucaoMensal: evolucaoMensal
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