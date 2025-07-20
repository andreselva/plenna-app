import { useCallback, useState } from 'react';
import { useInvoiceManager } from "../Hooks/InvoiceManager/useInvoiceManager";
import { useRelatedInvoices } from '../Hooks/InvoiceManager/useRelatedInvoices';
import AlertConfirm from '../Components/Alerts/AlertConfirm';
import { usePaymentManager } from '../Hooks/PaymentManager/usePaymentManager';

export const useInvoiceHandler = (periodo) => {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [amountValue, setAmountValue] = useState(0);
    const [paymentDate, setPaymentDate] = useState('');
    const [totalPaid, setTotalPaid] = useState(0);

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
        const result = await AlertConfirm(`Registrar pagamento`, `Você confirma o pagamento de R$ ${paymentData.value}?`, 'warning');

        if (result.isConfirmed) {
            registerPayment(paymentData);
        }
    }, [registerPayment]);

    const handleSearchRelatedInvoices = useCallback(async (idBankAccount) => {
        return await fetchRelated(idBankAccount);
    }, [fetchRelated]);

    return {
        invoices,
        handleGenerateInvoices,
        handleSearchRelatedInvoices,
        handlePayment,
        amountValue,
        setAmountValue,
        paymentDate,
        setPaymentDate,
        isPaymentModalOpen,
        setPaymentModalOpen,
        totalPaid,
        setTotalPaid,
        loading: managerLoading || relatedLoading,
        error: managerError || relatedError
    };
};