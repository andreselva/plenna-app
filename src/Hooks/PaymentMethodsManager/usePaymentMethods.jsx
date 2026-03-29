import { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';
import { SEFAZ_PAYMENT_METHODS } from '../../Configs/paymentMethods.constants';
import { Operations } from '../../enum/operations.enum';

const apiUrl = '/payment-methods';

const mergeWithDefaultMethods = (apiItems = []) => {
  const apiMap = new Map();

  apiItems.forEach((item) => {
    const code = String(item.code || '').padStart(2, '0');
    apiMap.set(code, {
      ...item,
      code,
      isActive: item.isActive ?? item.active ?? false,
    });
  });

  return SEFAZ_PAYMENT_METHODS.map((method) => {
    const existing = apiMap.get(method.code);

    return {
      id: existing?.id ?? method.code,
      code: method.code,
      name: existing?.name ?? method.name,
      isActive: existing?.isActive ?? false,
    };
  });
};

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toggleLoadingCode, setToggleLoadingCode] = useState(null);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      if (hasFetched.current) return;

      hasFetched.current = true;
      setLoading(true);

      try {
        const { data: response, status } = await axiosInstance.get(apiUrl);

        if (response && status >= 200 && status <= 204) {
          const payload =
            response.payload?.paymentMethods ??
            response.payload ??
            response ??
            [];

          const normalized = mergeWithDefaultMethods(
            Array.isArray(payload) ? payload : []
          );

          setPaymentMethods(normalized);
          return;
        }

        throw new Error('Um erro ocorreu ao buscar as formas de pagamento.');
      } catch (err) {
        const normalized = mergeWithDefaultMethods([]);
        setPaymentMethods(normalized);

        const errorMessage = defineErrorMessage(err, Operations.BUSCAR);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const togglePaymentMethodStatus = async (paymentMethod) => {
    const nextStatus = !paymentMethod.isActive;
    const actionLabel = nextStatus ? 'ativar' : 'desativar';

    const confirmation = await Swal.fire({
      title: `Deseja realmente ${actionLabel}?`,
      text: `A forma de pagamento "${paymentMethod.name}" será ${nextStatus ? 'ativada' : 'desativada'}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: nextStatus ? 'Ativar' : 'Desativar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (!confirmation.isConfirmed) {
      return false;
    }

    setToggleLoadingCode(paymentMethod.code);

    try {
      const payload = {
        code: paymentMethod.code,
        name: paymentMethod.name,
        isActive: nextStatus,
      };

      const { data: response, status } = await axiosInstance.put(
        `${apiUrl}/${paymentMethod.code}/status`,
        payload
      );

      if (response && status >= 200 && status <= 204) {
        setPaymentMethods((prev) =>
          prev.map((item) =>
            item.code === paymentMethod.code
              ? { ...item, isActive: nextStatus }
              : item
          )
        );

        AlertToast({
          icon: 'success',
          title: `Forma de pagamento ${nextStatus ? 'ativada' : 'desativada'} com sucesso.`,
        });

        return true;
      }

      throw new Error('Ocorreu um erro ao atualizar o status da forma de pagamento.');
    } catch (err) {
      const errorMessage = defineCustomErrorMessage(err, 'alterar o status da forma de pagamento');
      AlertToast({ icon: 'error', title: errorMessage });
      setError(errorMessage);
      return false;
    } finally {
      setToggleLoadingCode(null);
    }
  };

  const defineErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation} formas de pagamento: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation} formas de pagamento.`;
  };

  const defineCustomErrorMessage = (err, operation) => {
    if (err?.response?.data?.message) {
      return `Ocorreu um erro ao ${operation}: ${err.response.data.message}.`;
    }

    return `Ocorreu um erro ao ${operation}.`;
  };

  return {
    paymentMethods,
    loading,
    toggleLoadingCode,
    error,
    togglePaymentMethodStatus,
  };
};