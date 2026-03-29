import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';
import { Operations } from '../../enum/operations.enum';

const apiUrl = '/gateways';

const normalizeGatewaysList = (items = []) => {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    gateway: item.gateway,
    icon: item.icon,
    isActive: item.isActive ?? item.active ?? false,
    config: item.config ?? {},
  }));
};

const normalizeGatewayOptions = (items = []) => {
  return items.map((item) => ({
    value: String(item.id),
    label: item.name,
    gateway: item.gateway,
    icon: item.icon,
  }));
};

export const useGateways = () => {
  const [gateways, setGateways] = useState([]);
  const [gatewayOptions, setGatewayOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [optionsLoading, setOptionsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);
      setOptionsLoading(true);

      try {
        const { data, status } = await axiosInstance.get(apiUrl);

        if (data && status >= 200 && status <= 204) {
          const payload =
            data?.payload?.gateways ??
            data?.payload ??
            data ??
            [];

          const normalized = normalizeGatewaysList(Array.isArray(payload) ? payload : []);

          setGateways(normalized);
          setGatewayOptions(normalizeGatewayOptions(normalized));
          return;
        }

        throw new Error('Ocorreu um erro ao buscar os gateways.');
      } catch (err) {
        const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
        AlertToast({ icon: 'error', title: errorMessage });
        setError(errorMessage);
      } finally {
        setLoading(false);
        setOptionsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const addGateway = async (gateway) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.post(apiUrl, gateway);

      if (response && status >= 200 && status <= 204) {
        const created = response.payload?.gateway ?? response.payload ?? response;

        if (created?.id) {
          const normalizedCreated = normalizeGatewaysList([created])[0];

          setGateways((prev) => [...prev, normalizedCreated]);
          setGatewayOptions((prev) => [
            ...prev,
            {
              value: String(normalizedCreated.id),
              label: normalizedCreated.name,
              gateway: normalizedCreated.gateway,
              icon: normalizedCreated.icon,
            },
          ]);
        }

        AlertToast({ icon: 'success', title: 'Gateway cadastrado com sucesso.' });
        return created;
      }

      throw new Error('Ocorreu um erro ao cadastrar o gateway.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.CREATE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateGateway = async (id, gateway) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.put(`${apiUrl}/${id}`, gateway);

      if (response && status >= 200 && status <= 204) {
        const updated = response.payload?.gateway ?? response.payload ?? response;

        if (updated?.id) {
          const normalizedUpdated = normalizeGatewaysList([updated])[0];

          setGateways((prev) =>
            prev.map((item) => (item.id === id ? normalizedUpdated : item))
          );

          setGatewayOptions((prev) =>
            prev.map((item) =>
              String(item.value) === String(normalizedUpdated.id)
                ? {
                    value: String(normalizedUpdated.id),
                    label: normalizedUpdated.name,
                    gateway: normalizedUpdated.gateway,
                    icon: normalizedUpdated.icon,
                  }
                : item
            )
          );
        }

        AlertToast({ icon: 'success', title: 'Gateway atualizado com sucesso.' });
        return updated;
      }

      throw new Error('Ocorreu um erro ao atualizar o gateway.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.UPDATE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteGateway = async (id) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.delete(`${apiUrl}/${id}`);

      if (response && status >= 200 && status <= 204) {
        setGateways((prev) => prev.filter((gateway) => gateway.id !== id));
        setGatewayOptions((prev) => prev.filter((option) => String(option.value) !== String(id)));

        AlertToast({ icon: 'success', title: 'Gateway excluído com sucesso.' });
        return true;
      }

      throw new Error('Ocorreu um erro durante a exclusão do gateway.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.DELETE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const testGatewayIntegration = async (id) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.post(`${apiUrl}/${id}/test`);

      if (response && status >= 200 && status <= 204) {
        AlertToast({ icon: 'success', title: 'Integração testada com sucesso.' });
        return true;
      }

      throw new Error('Ocorreu um erro ao testar a integração.');
    } catch (err) {
      const errorMessage = defineCustomErrorMessage(err, 'testar integração');
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const defineErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation} gateway: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation} gateway.`;
  };

  const defineCustomErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation}: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation}.`;
  };

  return {
    gateways,
    gatewayOptions,
    loading,
    optionsLoading,
    error,
    addGateway,
    updateGateway,
    deleteGateway,
    testGatewayIntegration,
  };
};