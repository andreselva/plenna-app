import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

const apiUrl = "/transfers";
const entityType = "TRANSFER";

export const useTransfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchTransfers = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);
      try {
        const { data: response, status } = await axiosInstance.get(`${apiUrl}`);
        if (response && status >= 200 && status <= 204) {
          const payload = response.payload?.payments ?? response.payload ?? response ?? [];
          setTransfers(Array.isArray(payload) ? payload : []);
          return;
        }
        throw new Error("Um erro ocorreu ao buscar as transferências.");
      } catch (err) {
        const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
        AlertToast({ icon: "error", title: errorMessage });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTransfers();
  }, []);

  const addTransfer = async (transferData) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.post(apiUrl, transferData);
      if (response && status >= 200 && status <= 204) {
        const created = response.payload?.payment ?? response.payload ?? response;
        if (created?.id) {
          setTransfers((prev) => [created, ...prev]);
        }
        AlertToast({ icon: "success", title: "Transferência registrada com sucesso." });
        return created;
      }

      throw new Error("Ocorreu um erro ao registrar a transferência.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.CREATE);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteTransfer = async (id) => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.delete(`${apiUrl}/${id}`);
      if (response && status >= 200 && status <= 204) {
        setTransfers((prev) => prev.filter((t) => t.id !== id));
        AlertToast({ icon: "success", title: "Transferência excluída com sucesso." });
        return true;
      }

      throw new Error("Ocorreu um erro ao excluir a transferência.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.DELETE);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const defineErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation} transferência: ${err.response.data.message}.`;
    }
    return `Ocorreu um erro ao ${operation} transferência.`;
  };

  return {
    transfers,
    loading,
    error,
    addTransfer,
    deleteTransfer,
  };
};
