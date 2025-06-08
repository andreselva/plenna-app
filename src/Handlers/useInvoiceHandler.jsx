import { useCallback } from 'react';
import { useInvoiceManager } from "../Hooks/InvoiceManager/useInvoiceManager";
import { useRelatedInvoices } from '../Hooks/InvoiceManager/useRelatedInvoices';

export const useInvoiceHandler = (periodo) => {
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

    const handleSearchRelatedInvoices = useCallback(async (idBankAccount) => {
        return await fetchRelated(idBankAccount);
    }, [fetchRelated]);

    return {
        invoices,
        handleGenerateInvoices,
        handleSearchRelatedInvoices,
        loading: managerLoading || relatedLoading,
        error: managerError || relatedError
    };
};