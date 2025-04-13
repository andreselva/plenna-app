import { useState, useEffect, useRef } from "react";

const apiUrl = "http://localhost:8000/dashboard";

export const useDashboardData = () => {
    const [data, setData] = useState({
        saldoData: null,
        gastosPorCategoriaData: null,
        evolucaoMensalData: null,
        contasVencimentoProximo: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            if (hasFetched.current) return;

            hasFetched.current = true;
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados do dashboard");
                }

                const dashboardData = await response.json();
                setData(dashboardData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return { data, loading, error };
};