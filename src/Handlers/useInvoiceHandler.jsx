import { useCallback, useState } from 'react';
import { useInvoiceManager } from "../Hooks/InvoiceManager/useInvoiceManager";
import { useRelatedInvoices } from '../Hooks/InvoiceManager/useRelatedInvoices';
import { usePaymentManager } from '../Hooks/PaymentManager/usePaymentManager';

export const useInvoiceHandler = (periodo) => {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

    const {
        invoices,
        generateInvoices,
        loading: managerLoading,
        error: managerError
    } = useInvoiceManager(periodo);

    const {
        fetchRelated,
        loading: relatedLoading,
        error: relatedError
    } = useRelatedInvoices();

    const handleGenerateInvoices = (infosInvoice) => {
        return generateInvoices(infosInvoice);
    };

    const {
        registerPayment
    } = usePaymentManager();

    const handlePayment = useCallback(async (paymentData) => {
        registerPayment(paymentData);
    }, [registerPayment]);

    const handleSearchRelatedInvoices = useCallback(async (idBankAccount) => {
        return await fetchRelated(idBankAccount);
    }, [fetchRelated]);

    return {
        invoices,
        handleGenerateInvoices,
        handleSearchRelatedInvoices,
        handlePayment,
        isPaymentModalOpen,
        setPaymentModalOpen,
        loading: managerLoading || relatedLoading,
        error: managerError || relatedError
    };
};