import { usePaymentMethods } from '../../Hooks/PaymentMethodsManager/usePaymentMethods';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { PaymentMethodsTable } from '../../Tables/PaymentMethods/PaymentMethodsTable';

const PaymentMethods = () => {
  const {
    paymentMethods,
    loading,
    toggleLoadingCode,
    error,
    togglePaymentMethodStatus,
  } = usePaymentMethods();

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>
                Formas de pagamento
              </span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <PaymentMethodsTable
            paymentMethods={paymentMethods}
            loading={loading}
            toggleLoadingCode={toggleLoadingCode}
            onToggleStatus={togglePaymentMethodStatus}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;