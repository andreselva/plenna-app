import GenericModal from "../../Components/GenericModal/GenericModal";

export const PaymentInvoiceModal = ({
    invoice,
    setIsModalPaymentOpen,
    handlePayment,
    amountValue,
    setAmountValue,
    paymentDate,
    setPaymentDate
}) => {

    if (!invoice) {
        return null;
    }

    const handleCancel = () => {
        setIsModalPaymentOpen(false);
    }

    const handleSubmit = () => {
        const paymentData = {
            type: invoice,
            amount: amountValue,
            date: paymentDate
        }
        handlePayment(invoice, paymentData);
        setIsModalPaymentOpen(false);
    }

    const formFields = [
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
            width="800px"
            height="auto"
        />
    );
}