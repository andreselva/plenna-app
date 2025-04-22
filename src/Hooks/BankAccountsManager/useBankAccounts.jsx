import { useEffect, useRef, useState } from "react";

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
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error("Error fetching bank accounts");
                }

                const data = await response.json();
                setBankAccounts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBankAccounts();
    }, []);

    const addBankAccount = async (bankAccount) => {
        try {
            const response = await fetch(`${apiUrl}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(bankAccount),
            });

            if (!response.ok) {
                throw new Error("Error adding bank account");
            }

            const newBankAccount = await response.json();

            setBankAccounts((prev) => [...prev, newBankAccount]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteBankAccount = async (id) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error deleting bank account");
            }

            setBankAccounts((prev) => prev.filter((account) => account.id !== id));
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const updateBankAccount = async (id, updatedBankAccount) => {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedBankAccount),
            });

            if (!response.ok) {
                throw new Error("Error updating bank account");
            }

            const updatedAccount = await response.json();

            setBankAccounts((prev) =>
                prev.map((account) =>
                    account.id === id ? updatedAccount : account
                )
            );
        } catch (err) {
            setError(err.message);
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
}