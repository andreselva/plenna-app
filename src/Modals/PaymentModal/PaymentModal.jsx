import { useState } from "react";
import GenericModal from "../../Components/GenericModal/GenericModal";
import AlertConfirm from "../../Components/Alerts/AlertConfirm";
import { PayableType } from "../../enum/payable-type.enum";

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

    const payableTypes = {
        [PayableType.REVENUE]: 'Receita',
        [PayableType.EXPENSE]: 'Despesa',
        [PayableType.INVOICE]: 'Fatura'
    };

    const paymentStrings = {
        [PayableType.REVENUE]: `Registrar recebimento: ${payableItem.name}`,
        [PayableType.EXPENSE]: `Pagar despesa: ${payableItem.name}`,
        [PayableType.INVOICE]: `Pagar fatura: ${payableItem.name}`
    }

    const paymentStringConfirm = {
        [PayableType.REVENUE]: `Você está registrando o recebimento de R$ ${amountValue} dessa receita. Você confirma o recebimento?`,
        [PayableType.EXPENSE]: `Você está pagando R$ ${amountValue} dessa despesa. Você confirma o pagamento?`,
        [PayableType.INVOICE]: `Você está pagando R$ ${amountValue} dessa fatura. Você confirma o pagamento?`
    }

    const typeLabel = payableTypes[payableType] ?? 'Desconhecido';

    const paymentAmount = parseFloat(amountValue) || 0;
    const newTotalPaid = (payableItem.totalPaid ?? 0) + paymentAmount;
    const remainingToPay = (payableItem.value ?? 0) - newTotalPaid;

    const handleCancel = () => {
        setIsModalPaymentOpen(false);
    }

    const handleSubmit = async () => {
        const result = await AlertConfirm({
            title: payableType === PayableType.EXPENSE || payableType === PayableType.INVOICE ? 'Registrar pagamento' : 'Registrar recebimento',
            text: paymentStringConfirm[payableType],
            icon: 'warning',
            confirmButtonText: 'Sim',
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
                    value: Number(payableItem.value).toFixed(2),
                    readOnly: true,
                    disabled: true
                },
                {
                    label: "Valor já pago (R$)",
                    name: "totalPaid",
                    value: newTotalPaid.toFixed(2) ?? 0,
                    readOnly: true,
                    disabled: true
                },
                {
                    label: "Valor restante (R$)",
                    name: "remainingToPay",
                    value: remainingToPay.toFixed(2) ?? 0,
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
            title={paymentStrings[payableType]}
            formFields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Registrar pagamento"
            width="700px"
            height="auto"
        />
    );
}