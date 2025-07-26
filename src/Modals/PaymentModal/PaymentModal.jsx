import { useState } from "react";
import GenericModal from "../../Components/GenericModal/GenericModal";

export const PaymentModal = ({
    payableItem,
    payableType,
    setIsModalPaymentOpen,
    handlePayment,
}) => {
    const [amountValue, setAmountValue] = useState('');
    const [paymentDate, setPaymentDate] = useState(() => new Date().toISOString().split('T')[0]);

    if (!payableItem) {
        return null;
    }

    const typeLabel = payableType === 'invoice' ? 'Fatura' : 'Despesa';

    const paymentAmount = parseFloat(amountValue) || 0;
    const newTotalPaid = payableItem.totalPaid + paymentAmount;
    const remainingToPay = payableItem.value - newTotalPaid;

    const handleCancel = () => {
        setIsModalPaymentOpen(false);
    }

    const handleSubmit = () => {
        const paymentData = {
            payableId: payableItem.id,
            value: amountValue,
            paymentDate: paymentDate,
            payableType: payableType
        }
        handlePayment(paymentData);
        setIsModalPaymentOpen(false);
    }

    const formFields = [
        {
            // Título dinâmico
            title: `Informações da ${typeLabel}`,
            fields: [
                {
                    label: typeLabel,
                    name: "itemName",
                    value: payableItem.name,
                    readOnly: true,
                },
                {
                    label: "Valor Total (R$)",
                    name: "totalValue",
                    value: payableItem.value.toFixed(2),
                    readOnly: true,
                },
                {
                    label: "Valor já Pago (R$)",
                    name: "totalPaid",
                    value: newTotalPaid.toFixed(2),
                    readOnly: true,

                },
                {
                    label: "Valor Restante (R$)",
                    name: "remainingToPay",
                    value: remainingToPay.toFixed(2),
                    readOnly: true,
                }
            ]
        },
        {
            title: 'Pagamento',
            fields: [
                {
                    label: "Valor do Pagamento",
                    name: "amount",
                    value: amountValue,
                    onChange: setAmountValue,
                    type: "number",
                    required: true,
                },
                {
                    label: "Data do Pagamento",
                    name: "date",
                    value: paymentDate,
                    onChange: setPaymentDate,
                    type: "date",
                    required: true,
                    defaultValue: new Date().toISOString().split('T')[0],
                },
            ]
        }
    ];

    return (
        <GenericModal
            isOpen={true}
            // Título do modal dinâmico
            title={`Pagar ${typeLabel}: ${payableItem.name}`}
            formFields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Registrar Pagamento"
            width="700px"
            height="auto"
        />
    );
}