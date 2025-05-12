import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Auth/Context/AuthContext";

const apiUrl = "http://localhost:8000/dashboard";

export const useDashboardData = (periodo = {}) => {
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
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        hasFetched.current = false;

        const fetchData = async () => {
            if (hasFetched.current) return;
            if (!isAuthenticated) return;
            if (hasFetched.current) return;

            hasFetched.current = true;
            setLoading(true);
            try {
                const response = await fetch(apiUrl, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json', 'periodo': JSON.stringify(periodo),
                    },
                });

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
    }, [isAuthenticated, periodo]);

    return { data, loading, error };
};

