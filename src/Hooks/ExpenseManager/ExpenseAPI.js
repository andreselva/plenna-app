import axiosInstance from "../../api/axiosInstance";

const addExpense = async (expense, periodo) => {
    try {
        const { data } = await axiosInstance.post("/expenses", expense, {
            headers: { 'X-Periodo': JSON.stringify(periodo) }
        });
        return data;
    } catch (err) {
        throw err?.response?.data?.message || "Erro ao adicionar despesa!";
    }
};

const deleteExpense = async (id, periodo, deleteInstallments = false, sourceAccountId = 0) => {
    try {
        const url = deleteInstallments
            ? `/expenses/${id}?deleteInstallments=${deleteInstallments}&sourceAccountId=${sourceAccountId}`
            : `/expenses/${id}`;

        const { data } = await axiosInstance.delete(url, {
            headers: { 'X-Periodo': JSON.stringify(periodo) }
        });
        return data;
    } catch (err) {
        throw err?.response?.data?.message || "Erro ao excluir despesa!";
    }
};

const updateExpense = async (id, updatedExpense, periodo) => {
    try {
        const { data } = await axiosInstance.put(`/expenses/${id}`, updatedExpense, {
            headers: { 'X-Periodo': JSON.stringify(periodo) }
        });
        return data;
    } catch (err) {
        throw err?.response?.data?.message || "Erro ao atualizar despesa!";
    }
};

const registerPayment = async (paymentData) => {
    try {
        const { data } = await axiosInstance.post(`/expenses/payments`, paymentData);
        return data;
    } catch (err) {
        throw err?.response?.data?.message || "Erro ao registrar pagamento!";
    }
}

export const ExpenseAPI = {
    addExpense,
    deleteExpense,
    updateExpense,
    registerPayment
};