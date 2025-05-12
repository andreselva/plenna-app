import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../Auth/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export const useDashboardData = (periodo = {}) => {
    const [data, setData] = useState({
        saldoData: null,
        gastosPorCategoriaData: null,
        contasVencimentoProximo: [],
        evolucaoMensal: null,
        saldoRestante: 0,
        faturasPorCartao: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        hasFetched.current = false;

        const fetchData = async () => {
            if (hasFetched.current || !isAuthenticated) return;

            hasFetched.current = true;
            setLoading(true);

            try {
                const response = await axiosInstance.get('/dashboard', {
                    headers: {
                        'periodo': JSON.stringify(periodo)
                    }
                });

                const {
                    currentBalance,
                    expensesByCategory,
                    billsDue,
                    monthlyProgress,
                    remainingBalance,
                    creditCardStatements
                } = response.data;

                setData({
                    saldoData: currentBalance,
                    gastosPorCategoriaData: expensesByCategory,
                    contasVencimentoProximo: billsDue,
                    evolucaoMensal: monthlyProgress,
                    saldoRestante: remainingBalance,
                    faturasPorCartao: creditCardStatements
                });
            } catch (err: any) {
                if (err.response?.status === 401) {
                    logout();
                    navigate('/login');
                } else {
                    setError(err.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [isAuthenticated, periodo, logout, navigate, setError]);

    return { data, loading, error };
};
