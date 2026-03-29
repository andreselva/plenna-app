import globalStyles from '../../Styles/GlobalStyles.module.css';
import { useBillingRulesInline } from '../../Hooks/BillingRulesManager/useBillingRulesInline';
import { BillingRulesInlineTable } from '../../Tables/BillingRules/BillingRulesInlineTable';

const BillingRules = () => {
  const {
    rows,
    gatewayOptions,
    loading,
    savingCode,
    error,
    handleGatewayChange,
    saveBillingRule,
  } = useBillingRulesInline();

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>
                Regras de cobrança
              </span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <BillingRulesInlineTable
            rows={rows}
            gatewayOptions={gatewayOptions}
            loading={loading}
            savingCode={savingCode}
            onGatewayChange={handleGatewayChange}
            onSave={saveBillingRule}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default BillingRules;