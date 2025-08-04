import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

const apiUrl = "/api/bank-accounts";

export const useBankAccounts = () => {
    const [accounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            if (hasFetched.current) return;

            hasFetched.current = true;
            setLoading(true);
            try {
                const { data: response, status } = await axiosInstance.get(apiUrl);
                if (response && status >= 200 && status <= 204) {
                    setBankAccounts(response.payload.bankAccounts);
                    return;
                }
                throw new Error('Um erro ocorreu ao buscar as contas bancárias.');
            } catch (err) {
                const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
                AlertToast({ icon: 'error', title: errorMessage });
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccounts();
    }, []);

    const addBankAccount = async (bankAccount) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.post(apiUrl, bankAccount);
            if (response && status >= 200 && status <= 204) {
                setBankAccounts((prev) => [...prev, response.payload.bankAccount]);
                AlertToast({icon: 'success', title: 'Conta bancária criada com sucesso.'});
                return;
            }

            throw new Error('Ocorreu um erro ao criar a conta bancária.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.CREATE);
            AlertToast({ icon: 'error', title: errorMessage});
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const deleteBankAccount = async (id) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.delete(`${apiUrl}/${id}`);
            if (response && status >= 200 && status <= 204) {
                setBankAccounts((prev) => prev.filter((account) => account.id !== id));
                AlertToast({icon: 'success', title: 'Conta bancária excluída com sucesso.'});
                return;
            }

            throw new Error('Ocorreu um erro durante a exclusão da conta bancária.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.DELETE);
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const updateBankAccount = async (id, updatedBankAccount) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.put(`${apiUrl}/${id}`, updatedBankAccount);

            if (response && status >= 200 && status <= 204) {
                setBankAccounts((prev) =>
                    prev.map((account) =>
                        account.id === id ? response.payload.bankAccount : account
                    )
                );
                AlertToast({icon: 'success', title: 'Conta bancária atualizada com sucesso.'});
                return;
            }

            throw new Error('Ocorreu um erro ao atualizar a conta bancária.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.UPDATE);
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const defineErrorMessage = (err, operation) => {
        if (err?.response?.data?.message) {
            return `Ocorreu um erro ao ${operation} conta bancária: ${err.response.data.message}.`;
        }
        return `Ocorreu um erro ao ${operation} conta bancária.` ;
    }

    return {
        accounts,
        loading,
        error,
        addBankAccount,
        deleteBankAccount,
        updateBankAccount,
    };
};
