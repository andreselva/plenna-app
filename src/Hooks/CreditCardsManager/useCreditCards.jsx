import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

const apiUrl = "/credit-cards";

export const useCreditCards = () => {
  const [creditCards, setCreditCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCreditCards = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);
      try {
        const { data: response, status } = await axiosInstance.get(apiUrl);
        if (response && status >= 200 && status <= 204) {
          setCreditCards(response.payload.creditCards || []);
          return;
        }
        throw new Error('Um erro ocorreu ao buscar os cartões de crédito.');
      } catch (err) {
        const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
        AlertToast({ icon: 'error', title: errorMessage });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditCards();
  }, []);

  const addCreditCard = async (creditCard) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.post(apiUrl, creditCard);
      if (response && status >= 200 && status <= 204) {
        setCreditCards((prev) => [...prev, response.payload.creditCard]);
        AlertToast({ icon: 'success', title: 'Cartão de crédito criado com sucesso.' });
        return;
      }

      throw new Error('Ocorreu um erro ao criar o cartão de crédito.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.CREATE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteCreditCard = async (id) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.delete(`${apiUrl}/${id}`);
      if (response && status >= 200 && status <= 204) {
        setCreditCards((prev) => prev.filter((account) => account.id !== id));
        AlertToast({ icon: 'success', title: 'Cartão de crédito excluído com sucesso.' });
        return;
      }

      throw new Error('Ocorreu um erro durante a exclusão do cartão de crédito.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.DELETE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateCreditCard = async (id, updatedCreditCard) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.put(`${apiUrl}/${id}`, updatedCreditCard);

      if (response && status >= 200 && status <= 204) {
        setCreditCards((prev) =>
          prev.map((account) => (account.id === id ? response.payload.creditCard : account))
        );
        AlertToast({ icon: 'success', title: 'Cartão de crédito atualizado com sucesso.' });
        return;
      }

      throw new Error('Ocorreu um erro ao atualizar o cartão de crédito.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.UPDATE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const defineErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation} cartão de crédito: ${err.response.data.message}.`;
    }
    return `Ocorreu um erro ao ${operation} cartão de crédito.`;
  };

  return {
    creditCards,
    loading,
    error,
    addCreditCard,
    deleteCreditCard,
    updateCreditCard,
  };
};
