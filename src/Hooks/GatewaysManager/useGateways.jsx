import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';
import { Operations } from '../../enum/operations.enum';

const apiUrl = '/gateways';
const gatewayOptionsUrl = '/gateways/available';

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
        const [gatewaysResponse, optionsResponse] = await Promise.all([
          axiosInstance.get(apiUrl),
          axiosInstance.get(gatewayOptionsUrl),
        ]);

        const gatewaysPayload =
          gatewaysResponse.data?.payload?.gateways ??
          gatewaysResponse.data?.payload ??
          gatewaysResponse.data ??
          [];

        const optionsPayload =
          optionsResponse.data?.payload?.gateways ??
          optionsResponse.data?.payload ??
          optionsResponse.data ??
          [];

        setGateways(Array.isArray(gatewaysPayload) ? gatewaysPayload : []);
        setGatewayOptions(normalizeGatewayOptions(Array.isArray(optionsPayload) ? optionsPayload : []));
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
          setGateways((prev) => [...prev, created]);
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
          setGateways((prev) =>
            prev.map((item) => (item.id === id ? updated : item))
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
      return false;c
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

  const normalizeGatewayOptions = (items = []) => {
    return items.map((item) => ({
      value: item.gateway,
      label: item.name,
    }));
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