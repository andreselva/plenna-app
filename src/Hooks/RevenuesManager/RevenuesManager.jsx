import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";
import SweetAlert from "../../Components/Alerts/SweetAlert";

export const RevenuesManager = (periodo) => {
    const [revenues, setRevenues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRevenues = useCallback(async () => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.get("/revenues", {
                headers: {
                    'X-Periodo': JSON.stringify(periodo)
                }
            });

            if (response && status >= 200 && status <= 204) {
                setRevenues(response.payload.revenues);
                return;
            }

            throw new Error(`Ocorreu um erro ao buscar as contas a receber.`);
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
            SweetAlert.error(errorMessage);
            setError(err?.response?.data?.message || "Erro ao buscar as contas a receber!");
        } finally {
            setLoading(false);
        }
    }, [periodo]);

    useEffect(() => {
        fetchRevenues();
    }, [fetchRevenues]);

    const addRevenue = async (revenue) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.post("/revenues", revenue, {
                    headers: {
                        'X-Periodo': JSON.stringify(periodo)
                    }
                }
            );

            if (response && status >= 200 && status <= 204) {
                setRevenues(response.payload.revenues);
                AlertToast({icon: 'success', title: 'Conta a receber cadastrada com sucesso!'});
                return;
            }
            throw new Error(`Ocorreu um erro ao cadastrar a conta a receber.`);
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.CREATE);
            SweetAlert.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteRevenue = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        setLoading(true);
        try {
            const url = deleteInstallments
                ? `/revenues/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
                : `/revenues/${id}`;

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
            SweetAlert.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateRevenue = async (id, updatedRevenue) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.put(`/revenues/${id}`, updatedRevenue, {
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
            SweetAlert.error(errorMessage);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const defineErrorMessage = (err, operation) => {
        if (err?.response?.data?.message) {
            return `${err.response.data.message}`;
        }

        return `Ocorreu um erro ao ${operation} a receita.` ;
    }

    return { revenues, addRevenue, deleteRevenue, updateRevenue, loading, error, refetch: fetchRevenues };
};