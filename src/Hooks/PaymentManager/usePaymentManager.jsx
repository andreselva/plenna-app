import { useState, useCallback } from "react";
import axiosInstance from "../../api/axiosInstance";
// import AlertToast from "../../Components/Alerts/AlertToast";

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
            await axiosInstance.post("/payment", paymentData);
            // AlertToast.success("Pagamento registrado com sucesso!");
            return true;
        } catch (err) {
            setError(err);
            // AlertToast.error("Erro ao registrar o pagamento.");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Busca todos os pagamentos associados a uma entidade específica.
     */
    const getPaymentsByEntity = useCallback(async (entityType, entityId) => {
        setLoading(true);
        setError(null);
        try {
            const { data } = await axiosInstance.get(`/payment/${entityType}/${entityId}`);
            return data.payments || [];
        } catch (err) {
            setError(err);
            // AlertToast.error("Erro ao buscar os pagamentos.");
            return [];
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Estorna (exclui) um pagamento específico.
     */
    const reversePayment = useCallback(async (paymentId) => {
        setLoading(true);
        setError(null);
        try {
            await axiosInstance.delete(`/payment/${paymentId}`);
            // AlertToast.success("Pagamento estornado com sucesso!");
            return true;
        } catch (err) {
            setError(err);
            // AlertToast.error("Erro ao estornar o pagamento.");
            return false;
        } finally {
            setLoading(false);
        }
    }, []);

    return { loading, error, registerPayment, getPaymentsByEntity, reversePayment };
};