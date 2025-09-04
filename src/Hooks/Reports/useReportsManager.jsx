import { useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import AlertToast from "../../Components/Alerts/AlertToast";

const useReportsManager = () => {
    const endpoint = '/reports'
    const [loading, setLoading] = useState(false);

    const fetchDataFinancialSummary = async (periodo, tipoAnalise) => {
        setLoading(true);
        try {
            const { data: response, status } = await axiosInstance.get(
                `${endpoint}/financial-summary`, {
                    params: {
                        periodo,
                        tipoAnalise
                    }
                }
            );

            if (response && status >= 200 && status <= 204) {
                return {response: response.payload };
            }
        } catch (err) {
            const errorMessage = err?.response?.data?.message || 'Erro ao gerar relatório.';
            AlertToast({icon: 'error', title: errorMessage, timer: 4000});
        } finally {
            setLoading(false);
        }
    }

    return { 
        loading,
        fetchDataFinancialSummary
     }
}



export default useReportsManager;