import { useState, useEffect, useRef } from "react";

const apiUrl = "http://localhost:8000/dashboard";

export const useDashboardData = () => {
    const [data, setData] = useState({
        currentBalance: null,
        expensesByCategory: null,
        billsDue: [],
        monthlyProgress: null,
        remainingBalance: 0,
        creditCardStatements: null
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
                    currentBalance,
                    expensesByCategory,
                    billsDue,
                    monthlyProgress,
                    remainingBalance,
                    creditCardStatements
                } = await response.json();

                setData({
                    saldoData: currentBalance,
                    gastosPorCategoriaData: expensesByCategory,
                    contasVencimentoProximo: billsDue,
                    evolucaoMensal: monthlyProgress,
                    saldoRestante: remainingBalance,
                    faturasPorCartao: creditCardStatements
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