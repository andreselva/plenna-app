import { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

export const RevenuesManager = (periodo) => {
    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRevenues = async () => {
            try {
                const { data: response, status } = await axiosInstance.get("/api/revenues", {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                });

                if (response && status >= 200 && status <= 204) {
                    setRevenues(response.payload.revenues);
                    return;
                }

                throw new Error(`Ocorreu um erro ao buscar as receitas.`);
            } catch (err) {
                const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
                AlertToast({icon: 'error', title: errorMessage});
                setError(err?.response?.data?.message || "Erro ao buscar as receitas!");
            } finally {
                setLoading(false);
            }
        };

        fetchRevenues();
    }, [periodo]);

    const addRevenue = async (revenue) => {
        try {
            const { data: response, status } = await axiosInstance.post("/api/revenues", revenue, {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                }
            );

            if (response && status >= 200 && status <= 204) {
                setRevenues(response.payload.revenues);
                AlertToast({icon: 'success', title: 'Receita cadastrada com sucesso!'});
                return;
            }
            throw new Error(`Ocorreu um erro ao cadastrar a receita.`);
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.CREATE);
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        }
    };

    const deleteRevenue = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        try {
            const url = deleteInstallments
                ? `/api/revenues/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
                : `/api/revenues/${id}`;

            const { data: response, status } = await axiosInstance.delete(url, {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });

            if (response && status >= 200 && status <= 204) {
                setRevenues(response.payload.revenues);
                AlertToast({icon: 'success', title: 'Despesa exclúida com sucesso!'});
                return;
            }

            throw new Error('Ocorreu um erro ao excluir a despesa!');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.DELETE);
            AlertToast({icon: 'error', title: errorMessage})
            setError(errorMessage);
        }
    };

    const updateRevenue = async (id, updatedRevenue) => {
        try {
            const { data: response, status } = await axiosInstance.put(`/api/revenues/${id}`, updatedRevenue, {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });

            if (response && status >= 200 && status <= 204) {
                setRevenues(response.payload.revenues);
                AlertToast({icon: 'success', title: 'Receita(s) atualizada(s) com sucesso!'});
                return;
            }

            throw new Error('Ocorreu um erro ao atualizar a(s) receita(s).');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.UPDATE);
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        }
    };

    const defineErrorMessage = (err, operation) => {
        if (err?.response?.data?.message) {
            return `Ocorreu um erro ao ${operation} a receita: ${err.response.data.message}.`;
        }

        return `Ocorreu um erro ao ${operation} a receita.` ;
    }

    return { revenues, addRevenue, deleteRevenue, updateRevenue, loading, error };
};
