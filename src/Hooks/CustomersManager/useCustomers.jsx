import { useEffect, useRef, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";
import { Operations } from "../../enum/operations.enum";

const apiUrl = "/customers";

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);

      try {
        const { data: response, status } = await axiosInstance.get(apiUrl);

        if (response && status >= 200 && status <= 204) {
          const payload =
            response.payload?.customers ??
            response.payload ??
            response ??
            [];

          setCustomers(Array.isArray(payload) ? payload : []);
          return;
        }

        throw new Error("Um erro ocorreu ao buscar os clientes.");
      } catch (err) {
        const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
        AlertToast({ icon: "error", title: errorMessage });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const addCustomer = async (customer) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.post(apiUrl, customer);

      if (response && status >= 200 && status <= 204) {
        const created = response.payload?.customer ?? response.payload ?? response;

        if (created?.id) {
          setCustomers((prev) => [...prev, created]);
        }

        AlertToast({ icon: "success", title: "Cliente cadastrado com sucesso." });
        return created;
      }

      throw new Error("Ocorreu um erro ao cadastrar o cliente.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.CREATE);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateCustomer = async (id, customer) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.put(`${apiUrl}/${id}`, customer);

      if (response && status >= 200 && status <= 204) {
        const updated = response.payload?.customer ?? response.payload ?? response;

        if (updated?.id) {
          setCustomers((prev) =>
            prev.map((item) => (item.id === id ? updated : item))
          );
        }

        AlertToast({ icon: "success", title: "Cliente atualizado com sucesso." });
        return updated;
      }

      throw new Error("Ocorreu um erro ao atualizar o cliente.");
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.UPDATE);
      AlertToast({ icon: "error", title: errorMessage });
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomer = async (id) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.delete(`${apiUrl}/${id}`);

      if (response && status >= 200 && status <= 204) {
        setCustomers((prev) => prev.filter((customer) => customer.id !== id));
        AlertToast({ icon: "success", title: "Cliente excluído com sucesso." });
        return true;
      }

      throw new Error("Ocorreu um erro durante a exclusão do cliente.");
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
      return `Ocorreu um erro ao ${operation} cliente: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation} cliente.`;
  };

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  };
};