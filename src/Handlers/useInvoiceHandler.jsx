import { useCallback, useState } from 'react';
import { useInvoiceManager } from "../Hooks/InvoiceManager/useInvoiceManager";
import { useRelatedInvoices } from '../Hooks/InvoiceManager/useRelatedInvoices';
import AlertConfirm from '../Components/Alerts/AlertConfirm';
import { usePaymentManager } from '../Hooks/PaymentManager/usePaymentManager';

export const useInvoiceHandler = (periodo) => {
    const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
    const [amountValue, setAmountValue] = useState(0);
    const [paymentDate, setPaymentDate] =  useState('');

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
        registerPaymentInvoice
    } = usePaymentManager();

    const handlePayment = useCallback(async (invoice, paymentData) => {
        const paymentValue = paymentData.amount;

        if (invoice && paymentValue > 0) {
            const result = await AlertConfirm(`Registrar pagamento`, `Você confirma o pagamento de R$ ${paymentValue} para a fatura ${invoice.name}?`, 'warning');

            if (result.isConfirmed) {
                registerPaymentInvoice(invoice, paymentData);
            }
        }
    }, [registerPaymentInvoice]);

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
        loading: managerLoading || relatedLoading,
        error: managerError || relatedError
    };
};