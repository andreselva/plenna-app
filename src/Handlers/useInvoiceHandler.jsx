import { useInvoiceManager } from "../Hooks/InvoiceManager/useInvoiceManager";

export const useInvoiceHandler = (periodo) => {
    const { invoices } = useInvoiceManager(periodo);

    return {
        invoices,
    }
}