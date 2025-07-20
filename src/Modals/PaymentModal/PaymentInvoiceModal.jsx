import GenericModal from "../../Components/GenericModal/GenericModal";

export const PaymentInvoiceModal = ({
    invoice,
    setIsModalPaymentOpen,
    handlePayment,
    amountValue,
    setAmountValue,
    paymentDate,
    setPaymentDate,
}) => {

    if (!invoice) {
        return null;
    }

    const paymentAmount = parseFloat(amountValue) || 0;
    const newTotalPaid = invoice.totalPaid + paymentAmount;
    const remainingToPay = invoice.value - newTotalPaid;

    const handleCancel = () => {
        setIsModalPaymentOpen(false);
        setPaymentDate('');
        setAmountValue(0);
    }

    const handleSubmit = () => {
        const paymentData = {
            payableId: invoice.id,
            value: amountValue,
            paymentDate: paymentDate,
            payableType: "invoice"
        }
        handlePayment(paymentData);
        setIsModalPaymentOpen(false);
    }

    const formFields = [
        {
            fields: [
                {
                    label: "Fatura",
                    name: "invoiceName",
                    value: invoice.name,
                    readOnly: true
                },
                {
                    label: "Valor Total (R$)",
                    name: "totalValue",
                    value: invoice.value.toFixed(2),
                    readOnly: true
                },
                {
                    label: "Valor Pago (R$)",
                    name: "totalPaid",
                    value: newTotalPaid.toFixed(2),
                    readOnly: true
                },
                {
                    label: "Valor Restante (R$)",
                    name: "remainingToPay",
                    value: remainingToPay.toFixed(2),
                    readOnly: true
                }
            ]
        },
        {
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
                    defaultValue: new Date().toISOString().split('T')[0]
                },
            ]
        }
    ];

    return (
        <GenericModal
            isOpen={true}
            title={`Pagar Fatura: ${invoice.name}`}
            formFields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Registrar Pagamento"
            width="700px"
            height="auto"
        />
    );
}