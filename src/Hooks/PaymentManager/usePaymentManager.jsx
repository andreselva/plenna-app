import { useState, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";

const endpoint = "/payment";

export const usePaymentManager = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Registra um novo pagamento para uma entidade (despesa, receita, fatura).
     */
    const registerPayment = useCallback(async (paymentData) => {
        setLoading(true);
        setError(null);
        try {
            const { data: response, status } = await axiosInstance.post(endpoint, paymentData);
            if (response && status >= 200 && status <= 204) {
                AlertToast({icon: 'success', title: 'Pagamento registrado.'});
                return true;
            }
            throw new Error('Ocorreu um erro ao registrar o pagamento.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, 'registrar');
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Busca todos os pagamentos associados a uma entidade específica.
     * (Não necessita de alterações, pois seu padrão para leitura de dados já é adequado)
     */
    const getPaymentsByEntity = useCallback(async (entityType, entityId) => {
        setLoading(true);
        setError(null);
        try {
            const { data: response, status } = await axiosInstance.get(`${endpoint}/${entityType}/${entityId}`);

            if (response && status >= 200 && status <= 204) {
                return response?.payload?.payments || [];
            }

            throw new Error(`Erro ao buscar pagamentos relacionados a ${entityType}`);
        } catch (err) {
            const errorMessage = defineErrorMessage(err, 'buscar');
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Estorna (exclui) um pagamento específico.
     */
    const reversePayment = useCallback(async (reservePaymentData) => {
        setLoading(true);
        setError(null);
        try {
            const { data: response, status } = await axiosInstance.delete(`${endpoint}/reverse`, {
                data: reservePaymentData,
            });

            if (response && status >= 200 && status <= 204) {
                AlertToast({icon: 'success', title: 'Pagamento estornado.'})
                return { isSuccess: true, status: response.payload.status };
            }

            throw new Error('Ocorreu um erro ao estornar o pagamento.');
        } catch (err) {
            const errorMessage = defineErrorMessage(err, 'estornar');
            AlertToast({icon: 'error', title: errorMessage});
            setError(errorMessage);
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    const defineErrorMessage = (err, operation) => {
        if (err?.response?.data?.message) {
            return `Ocorreu um erro ao ${operation} o pagamento: ${err.response.data.message}.`;
        }
        return `Ocorreu um erro ao ${operation} o pagamento.` ;
    }

    return { loading, error, registerPayment, getPaymentsByEntity, reversePayment };
};