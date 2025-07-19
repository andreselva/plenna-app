import { useState } from "react"
import axiosInstance from "../../api/axiosInstance";

export const usePaymentManager = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const registerPaymentInvoice = async (invoice, paymentInformation) => {
        setLoading(true);
        try {
            const paymentData = {invoice, paymentInformation};
            const { data } = await axiosInstance.post("/payment", paymentData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }

    return { registerPaymentInvoice }
}