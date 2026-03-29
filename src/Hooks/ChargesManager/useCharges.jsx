import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

const apiUrl = "/charges";

export const useCharges = () => {
  const [charges, setCharges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCharges = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);

      try {
        const { data: response, status } = await axiosInstance.get(apiUrl);

        if (response && status >= 200 && status <= 204) {
          const payload =
            response.payload?.charges ??
            response.payload ??
            response ??
            [];

          setCharges(Array.isArray(payload) ? payload : []);
          return;
        }

        throw new Error("Um erro ocorreu ao buscar as cobranças.");
      } catch (err) {
        const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
        AlertToast({ icon: "error", title: errorMessage });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCharges();
  }, []);

  const reprocessCharge = async (id) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.post(`${apiUrl}/${id}/reprocess`);

      if (response && status >= 200 && status <= 204) {
        AlertToast({ icon: "success", title: "Cobrança reprocessada com sucesso." });
        await refreshCharges();
        return true;
      }

      throw new Error("Ocorreu um erro ao reprocessar a cobrança.");
    } catch (err) {
      const errorMessage = defineActionErrorMessage(err, "reprocessar");
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const cancelCharge = async (id) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.post(`${apiUrl}/${id}/cancel`);

      if (response && status >= 200 && status <= 204) {
        AlertToast({ icon: "success", title: "Cobrança cancelada com sucesso." });
        await refreshCharges();
        return true;
      }

      throw new Error("Ocorreu um erro ao cancelar a cobrança.");
    } catch (err) {
      const errorMessage = defineActionErrorMessage(err, "cancelar");
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getChargeHistory = async (id) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.get(`${apiUrl}/${id}/history`);

      if (response && status >= 200 && status <= 204) {
        const history =
          response.payload?.history ??
          response.payload ??
          response ??
          [];

        return Array.isArray(history) ? history : [];
      }

      throw new Error("Ocorreu um erro ao buscar o histórico da cobrança.");
    } catch (err) {
      const errorMessage = defineActionErrorMessage(err, "buscar o histórico de");
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const refreshCharges = async () => {
    try {
      const { data: response, status } = await axiosInstance.get(apiUrl);

      if (response && status >= 200 && status <= 204) {
        const payload =
          response.payload?.charges ??
          response.payload ??
          response ??
          [];

        setCharges(Array.isArray(payload) ? payload : []);
      }
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
      setError(errorMessage);
    }
  };

  const defineErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation} cobranças: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation} cobranças.`;
  };

  const defineActionErrorMessage = (err, action) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${action} cobrança: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${action} cobrança.`;
  };

  return {
    charges,
    loading,
    error,
    reprocessCharge,
    cancelCharge,
    getChargeHistory,
    refreshCharges,
  };
};