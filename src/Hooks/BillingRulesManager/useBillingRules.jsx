import { useEffect, useRef, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';
import { Operations } from '../../enum/operations.enum';

const apiUrl = '/billing-rules';
const paymentMethodsUrl = '/payment-methods';
const gatewaysUrl = '/gateways';

export const useBillingRules = () => {
  const [billingRules, setBillingRules] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [supportDataLoading, setSupportDataLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);
      setSupportDataLoading(true);

      try {
        const [rulesResponse, paymentMethodsResponse, gatewaysResponse] = await Promise.all([
          axiosInstance.get(apiUrl),
          axiosInstance.get(paymentMethodsUrl),
          axiosInstance.get(gatewaysUrl),
        ]);

        const rulesPayload =
          rulesResponse.data?.payload?.billingRules ??
          rulesResponse.data?.payload ??
          rulesResponse.data ??
          [];

        const paymentMethodsPayload =
          paymentMethodsResponse.data?.payload?.paymentMethods ??
          paymentMethodsResponse.data?.payload ??
          paymentMethodsResponse.data ??
          [];

        const gatewaysPayload =
          gatewaysResponse.data?.payload?.gateways ??
          gatewaysResponse.data?.payload ??
          gatewaysResponse.data ??
          [];

        setBillingRules(Array.isArray(rulesPayload) ? rulesPayload : []);
        setPaymentMethods(Array.isArray(paymentMethodsPayload) ? paymentMethodsPayload : []);
        setGateways(Array.isArray(gatewaysPayload) ? gatewaysPayload : []);
      } catch (err) {
        const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
        AlertToast({ icon: 'error', title: errorMessage });
        setError(errorMessage);
      } finally {
        setLoading(false);
        setSupportDataLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const addBillingRule = async (billingRule) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.post(apiUrl, billingRule);

      if (response && status >= 200 && status <= 204) {
        const created = response.payload?.billingRule ?? response.payload ?? response;

        if (created?.id) {
          setBillingRules((prev) => [...prev, created]);
        }

        AlertToast({ icon: 'success', title: 'Regra de cobrança cadastrada com sucesso.' });
        return created;
      }

      throw new Error('Ocorreu um erro ao cadastrar a regra de cobrança.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.CREATE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateBillingRule = async (id, billingRule) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.put(`${apiUrl}/${id}`, billingRule);

      if (response && status >= 200 && status <= 204) {
        const updated = response.payload?.billingRule ?? response.payload ?? response;

        if (updated?.id) {
          setBillingRules((prev) =>
            prev.map((item) => (item.id === id ? updated : item))
          );
        }

        AlertToast({ icon: 'success', title: 'Regra de cobrança atualizada com sucesso.' });
        return updated;
      }

      throw new Error('Ocorreu um erro ao atualizar a regra de cobrança.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.UPDATE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteBillingRule = async (id) => {
    setLoading(true);

    try {
      const { data: response, status } = await axiosInstance.delete(`${apiUrl}/${id}`);

      if (response && status >= 200 && status <= 204) {
        setBillingRules((prev) => prev.filter((rule) => rule.id !== id));
        AlertToast({ icon: 'success', title: 'Regra de cobrança excluída com sucesso.' });
        return true;
      }

      throw new Error('Ocorreu um erro durante a exclusão da regra de cobrança.');
    } catch (err) {
      const errorMessage = defineErrorMessage(err, Operations.DELETE);
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const defineErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation} regra de cobrança: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation} regra de cobrança.`;
  };

  return {
    billingRules,
    paymentMethods,
    gateways,
    loading,
    supportDataLoading,
    error,
    addBillingRule,
    updateBillingRule,
    deleteBillingRule,
  };
};