import { useBillingRuleHandler } from '../../Handlers/useBillingRuleHandler';
import { ModalBillingRules } from '../../Modals/ModalBillingRules/ModalBillingRules';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { BillingRulesTable } from '../../Tables/BillingRules/BillingRulesTable';

const BillingRules = () => {
  const {
    billingRules,
    paymentMethods,
    gateways,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingBillingRule,
    setEditingBillingRule,
    handleEditBillingRule,
    handleDeleteBillingRule,
    handleSaveBillingRule,
    resetForm,
    loading,
    supportDataLoading,
    error,
  } = useBillingRuleHandler();

  const handleOpenModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <button
                className={globalStyles['title-items-button']}
                onClick={handleOpenModal}
              />
              <span className={globalStyles['title-items-span']}>Regras de cobrança</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <BillingRulesTable
            billingRules={billingRules}
            paymentMethods={paymentMethods}
            gateways={gateways}
            onEdit={handleEditBillingRule}
            onDelete={handleDeleteBillingRule}
            loading={loading || supportDataLoading}
            error={error}
          />
        </div>
      </div>

      {isModalOpen && (
        <ModalBillingRules
          setIsModalOpen={setIsModalOpen}
          handleSaveBillingRule={handleSaveBillingRule}
          setEditingBillingRule={setEditingBillingRule}
          editingBillingRule={editingBillingRule}
          formData={formData}
          setField={setField}
          resetForm={resetForm}
          paymentMethods={paymentMethods}
          gateways={gateways}
        />
      )}
    </div>
  );
};

export default BillingRules;