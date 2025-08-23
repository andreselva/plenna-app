import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

export const useDashboardData = (periodo = {}) => {
    const [data, setData] = useState({
        saldoData: null,
        gastosPorCategoriaData: null,
        contasVencimentoProximo: [],
        evolucaoMensal: null,
        saldoRestante: 0,
        faturasPorCartao: null,
        maiorFatura: null
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        hasFetched.current = false;

        const fetchData = async () => {
            if (hasFetched.current) return;
            setLoading(true);
            hasFetched.current = true;

            try {
                const {data: response} = await axiosInstance.get('/dashboard', {
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
                    creditCardStatements,
                    highestBillCard
                } = response.payload.dashboardData;

                setData({
                    saldoData: currentBalance,
                    gastosPorCategoriaData: expensesByCategory,
                    contasVencimentoProximo: billsDue,
                    evolucaoMensal: monthlyProgress,
                    saldoRestante: remainingBalance,
                    faturasPorCartao: creditCardStatements,
                    maiorFatura: highestBillCard
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [periodo, navigate, setError]);

    return { data, loading, error };
};
