import SweetAlert from "../../Components/Alerts/SweetAlert";
import GenericModal from "../../Components/GenericModal/GenericModal";

export const PaymentModalExpense = ({
    expense,
    setIsPaymentModalOpen,
    handlePayment,
    paymentDate,
    setPaymentDate
}) => {

    if (!expense) {
        return null;
    }

    const handleCancel = () => {
        setIsPaymentModalOpen(false);
    }

    const handleSubmit = () => {
        if (expense.idInvoice) {
            SweetAlert.error("Não é possível registrar pagamento em despesas vinculadas a cartões de crédito!");
            return;
        }
        if (expense.status === 'paid') {
            SweetAlert.error("Esta despesa já está paga!");
            return;
        }

        const paymentData = {
            payableId: expense.id,
            value: expense.value,
            paymentDate: paymentDate,
            payableType: "expense"
        }
        handlePayment(paymentData);
        setIsPaymentModalOpen(false);
    }

    const formFields = [
        {
            fields: [
                {
                    label: "Despesa",
                    name: "expenseName",
                    value: expense.name,
                    readOnly: true
                },
                {
                    label: "Valor Total (R$)",
                    name: "totalValue",
                    value: expense.value.toFixed(2),
                    readOnly: true
                },
            ]
        },
        {
            fields: [
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
            title={`Pagar Despesa: ${expense.name}`}
            formFields={formFields}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            submitButtonText="Pagar"
            width="500px"
            height="auto"
        />
    );
}