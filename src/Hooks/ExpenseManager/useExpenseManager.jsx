import { useState } from "react";
import { useExpensesList } from "./useExpensesList";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

const endpoint = "/expenses";

export const useExpenseManager = (periodo) => {
    const { expenses, loading, error: fetchError, refetch } = useExpensesList(periodo);

    const [error, setError] = useState(null);

    const addExpense = async (expense) => {
        try {
            const { data: response, status } = await axiosInstance.post(endpoint, expense, {
                headers: { 'X-Periodo': JSON.stringify(periodo) }
            });

            if (response && status >= 200 && status <= 204) {
                await refetch();
                AlertToast({icon: 'success', title: 'Despesa cadastrada com sucesso!'})
                return;
            }

            throw new Error('Ocorreu um erro ao criar a despesa.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.CREATE);
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        }
    };

    const deleteExpense = async (id, deleteInstallments = false, sourceAccountId = 0) => {
        try {
            const url = deleteInstallments
                ? `${endpoint}/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
                : `${endpoint}/${id}`;

            const { data: response, status } = await axiosInstance.delete(url, {
                headers: { 'X-Periodo': JSON.stringify(periodo) }
            });

            if (response && status >= 200 && status <= 204) {
                await refetch();
                AlertToast({icon: 'success', title: 'Despesa excluída com sucesso.'});
                return;
            }

            throw new Error('Ocorreu um erro durante a exclusão da despesa.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.DELETE);
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        }
    };

    const updateExpense = async (id, updatedExpense) => {
        try {
            const { data: response, status } = await axiosInstance.put(`${endpoint}/${id}`, updatedExpense, {
                headers: { 'X-Periodo': JSON.stringify(periodo) }
            });

            if (response && status >= 200 && status <= 204) {
                await refetch();
                AlertToast({icon: 'success', title: 'Despesa atualizada com sucesso!'});
                return;
            }

            throw new Error('Ocorreu um erro ao atualizar a despesa.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, Operations.UPDATE);
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        }
    };

    const registerPaymentExpense = async (paymentData) => {
         try {
            const { data: response, status } = await axiosInstance.post(`${endpoint}/payments`, paymentData, {
                headers: { 'X-Periodo': JSON.stringify(periodo) }
            });

            if (response && status >= 200 && status <= 204) {
                await refetch();
                AlertToast({icon: 'success', title: 'Pagamento registrado com sucesso!'});
                return;
            }

            throw new Error('Ocorreu um erro ao registrar o pagamento.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, 'registrar o pagamento da');
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
        }
    }

    const defineErrorMessage = (err, operation) => {
        if (err?.response?.data?.message) {
            return `Ocorreu um erro ao ${operation} despesa: ${err.response.data.message}.`;
        }
        return `Ocorreu um erro ao ${operation} despesa.` ;
    }

    return {
        expenses,
        addExpense,
        deleteExpense,
        updateExpense,
        registerPaymentExpense,
        loading,
        error: fetchError || error
    };
};