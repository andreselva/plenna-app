import { useEffect, useMemo, useRef, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';

const paymentMethodsUrl = '/payment-methods';
const gatewaysUrl = '/gateways';
const billingRulesUrl = '/billing-rules';

const normalizePaymentMethods = (items = []) => {
  return items
    .map((item) => ({
      id: item.id ?? item.code,
      code: String(item.code ?? '').padStart(2, '0'),
      name: item.name,
      isActive: item.isActive ?? item.active ?? false,
    }))
    .filter((item) => item.isActive);
};

const normalizeGateways = (items = []) => {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
    gateway: item.gateway,
    icon: item.icon,
  }));
};

const normalizeBillingRules = (items = []) => {
  return items.map((item) => ({
    id: item.id,
    paymentMethodCode: String(
      item.paymentMethodCode ??
      item.paymentMethod?.code ??
      ''
    ).padStart(2, '0'),
    gatewayId:
      item.gatewayId ??
      item.gateway?.id ??
      null,
  }));
};

export const useBillingRulesInline = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [gateways, setGateways] = useState([]);
  const [billingRules, setBillingRules] = useState([]);
  const [selectedGateways, setSelectedGateways] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingCode, setSavingCode] = useState(null);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);

      try {
        const [paymentMethodsResponse, gatewaysResponse, billingRulesResponse] = await Promise.all([
          axiosInstance.get(paymentMethodsUrl),
          axiosInstance.get(gatewaysUrl),
          axiosInstance.get(billingRulesUrl),
        ]);

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

        const billingRulesPayload =
          billingRulesResponse.data?.payload?.billingRules ??
          billingRulesResponse.data?.payload ??
          billingRulesResponse.data ??
          [];

        const normalizedPaymentMethods = normalizePaymentMethods(
          Array.isArray(paymentMethodsPayload) ? paymentMethodsPayload : []
        );

        const normalizedGateways = normalizeGateways(
          Array.isArray(gatewaysPayload) ? gatewaysPayload : []
        );

        const normalizedBillingRules = normalizeBillingRules(
          Array.isArray(billingRulesPayload) ? billingRulesPayload : []
        );

        const initialSelections = normalizedPaymentMethods.reduce((acc, paymentMethod) => {
          const existingRule = normalizedBillingRules.find(
            (rule) => String(rule.paymentMethodCode) === String(paymentMethod.code)
          );

          acc[paymentMethod.code] = existingRule?.gatewayId ? String(existingRule.gatewayId) : '';
          return acc;
        }, {});

        setPaymentMethods(normalizedPaymentMethods);
        setGateways(normalizedGateways);
        setBillingRules(normalizedBillingRules);
        setSelectedGateways(initialSelections);
      } catch (err) {
        const errorMessage = defineErrorMessage(err);
        AlertToast({ icon: 'error', title: errorMessage });
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const rows = useMemo(() => {
    return paymentMethods.map((paymentMethod) => {
      const selectedGatewayId = selectedGateways[paymentMethod.code] ?? '';
      const currentGateway = gateways.find(
        (gateway) => String(gateway.id) === String(selectedGatewayId)
      );

      return {
        id: paymentMethod.code,
        code: paymentMethod.code,
        name: paymentMethod.name,
        paymentMethodLabel: `${paymentMethod.code} - ${paymentMethod.name}`,
        gatewayId: selectedGatewayId,
        gatewayName: currentGateway?.name || '-',
      };
    });
  }, [paymentMethods, gateways, selectedGateways]);

  const gatewayOptions = useMemo(() => {
    return gateways.map((gateway) => ({
      value: String(gateway.id),
      label: gateway.name,
    }));
  }, [gateways]);

  const handleGatewayChange = (paymentMethodCode, gatewayId) => {
    setSelectedGateways((prev) => ({
      ...prev,
      [paymentMethodCode]: gatewayId,
    }));
  };

  const saveBillingRule = async (paymentMethodCode) => {
    const selectedGatewayId = selectedGateways[paymentMethodCode];

    if (!selectedGatewayId) {
      AlertToast({
        icon: 'warning',
        title: 'Selecione um gateway antes de salvar.',
      });
      return false;
    }

    setSavingCode(paymentMethodCode);

    try {
      const payload = {
        paymentMethodCode: String(paymentMethodCode).padStart(2, '0'),
        gatewayId: Number(selectedGatewayId),
      };

      const { data: response, status } = await axiosInstance.put(
        `${billingRulesUrl}/payment-methods/${String(paymentMethodCode).padStart(2, '0')}`,
        payload
      );

      if (response && status >= 200 && status <= 204) {
        const returnedRule = response.payload?.billingRule ?? response.payload ?? response;

        const normalizedReturnedRule = returnedRule
          ? normalizeBillingRules([returnedRule])[0]
          : {
              id: paymentMethodCode,
              paymentMethodCode: String(paymentMethodCode).padStart(2, '0'),
              gatewayId: Number(selectedGatewayId),
            };

        setBillingRules((prev) => {
          const existingIndex = prev.findIndex(
            (item) => String(item.paymentMethodCode) === String(normalizedReturnedRule.paymentMethodCode)
          );

          if (existingIndex >= 0) {
            const clone = [...prev];
            clone[existingIndex] = normalizedReturnedRule;
            return clone;
          }

          return [...prev, normalizedReturnedRule];
        });

        AlertToast({
          icon: 'success',
          title: 'Regra de cobrança salva com sucesso.',
        });

        return true;
      }

      throw new Error('Ocorreu um erro ao salvar a regra de cobrança.');
    } catch (err) {
      const errorMessage = defineCustomErrorMessage(err, 'salvar a regra de cobrança');
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setSavingCode(null);
    }
  };

  const defineErrorMessage = (err) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao buscar as regras de cobrança: ${err.response.data.message}.`;
    }

    return 'Ocorreu um erro ao buscar as regras de cobrança.';
  };

  const defineCustomErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation}: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation}.`;
  };

  return {
    rows,
    gateways,
    gatewayOptions,
    loading,
    savingCode,
    error,
    handleGatewayChange,
    saveBillingRule,
  };
};