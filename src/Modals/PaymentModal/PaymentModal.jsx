import { useState } from "react";
import GenericModal from "../../Components/GenericModal/GenericModal";
import AlertConfirm from "../../Components/Alerts/AlertConfirm";

export const PaymentModal = ({
    payableItem,
    payableType,
    setIsModalPaymentOpen,
    handlePayment,
    refetch = () => {}
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

    const handleSubmit = async () => {
        const result = await AlertConfirm({
            title: 'Registrar pagamento',
            text: `Você está pagando R$ ${amountValue} dessa ${typeLabel.toLowerCase()}. Você confirma o pagamento?`,
            icon: 'warning',
            confirmButtonText: 'Pagar',
            cancelButtonText: 'Não'
        });

        if (!result.isConfirmed) return;

        const paymentData = {
            payableId: Number(payableItem.id),
            value: Number(amountValue),
            paymentDate: paymentDate,
            payableType: payableType
        }
        await handlePayment(paymentData);
        setIsModalPaymentOpen(false);
        refetch();
    }

    const formFields = [
        {
            title: `Informações da ${typeLabel}`,
            fields: [
                {
                    label: typeLabel,
                    name: "itemName",
                    value: payableItem.name,
                    readOnly: true,
                    disabled: true
                },
                {
                    label: "Valor total (R$)",
                    name: "totalValue",
                    value: payableItem.value.toFixed(2),
                    readOnly: true,
                    disabled: true
                },
                {
                    label: "Valor já pago (R$)",
                    name: "totalPaid",
                    value: newTotalPaid.toFixed(2),
                    readOnly: true,
                    disabled: true
                },
                {
                    label: "Valor restante (R$)",
                    name: "remainingToPay",
                    value: remainingToPay.toFixed(2),
                    readOnly: true,
                    disabled: true
                }
            ]
        },
        {
            title: 'Pagamento',
            fields: [
                {
                    label: "Valor do pagamento",
                    name: "amount",
                    value: amountValue,
                    onChange: setAmountValue,
                    type: "number",
                    required: true,
                },
                {
                    label: "Data do pagamento",
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
            title={`Pagar ${typeLabel}: ${payableItem.name}`}
            formFields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Registrar pagamento"
            width="700px"
            height="auto"
        />
    );
}