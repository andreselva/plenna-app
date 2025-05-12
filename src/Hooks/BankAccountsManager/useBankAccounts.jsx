import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const apiUrl = "http://localhost:8000/bank-accounts";

export const useBankAccounts = () => {
    const [accounts, setBankAccounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        const fetchBankAccounts = async () => {
            if (hasFetched.current) return;

            hasFetched.current = true;
            try {
                const { data } = await axiosInstance.get(apiUrl);
                setBankAccounts(data);
            } catch (err) {
                setError(err?.response?.data?.message || "Error fetching bank accounts");
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccounts();
    }, []);

    const addBankAccount = async (bankAccount) => {
        try {
            const { data: newBankAccount } = await axiosInstance.post(apiUrl, bankAccount);
            setBankAccounts((prev) => [...prev, newBankAccount]);
        } catch (err) {
            setError(err?.response?.data?.message || "Error adding bank account");
        } finally {
            setLoading(false);
        }
    };

    const deleteBankAccount = async (id) => {
        try {
            await axiosInstance.delete(`${apiUrl}/${id}`);
            setBankAccounts((prev) => prev.filter((account) => account.id !== id));
        } catch (err) {
            setError(err?.response?.data?.message || "Error deleting bank account");
        } finally {
            setLoading(false);
        }
    };

    const updateBankAccount = async (id, updatedBankAccount) => {
        try {
            const { data: updatedAccount } = await axiosInstance.put(`${apiUrl}/${id}`, updatedBankAccount);
            setBankAccounts((prev) =>
                prev.map((account) =>
                    account.id === id ? updatedAccount : account
                )
            );
        } catch (err) {
            setError(err?.response?.data?.message || "Error updating bank account");
        } finally {
            setLoading(false);
        }
    };

    return {
        accounts,
        loading,
        error,
        addBankAccount,
        deleteBankAccount,
        updateBankAccount,
    };
};
