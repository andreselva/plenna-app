import { useGatewayHandler } from '../../Handlers/useGatewayHandler';
import { ModalGateways } from '../../Modals/ModalGateways/ModalGateways';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { GatewaysTable } from '../../Tables/Gateways/GatewaysTable';

const Gateways = () => {
  const {
    gateways,
    gatewayOptions,
    formData,
    setField,
    isModalOpen,
    setIsModalOpen,
    editingGateway,
    setEditingGateway,
    handleEditGateway,
    handleDeleteGateway,
    handleSaveGateway,
    handleIntegrationAction,
    getIntegrationActionLabel,
    resetForm,
    loading,
    optionsLoading,
    error,
  } = useGatewayHandler();

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
              <span className={globalStyles['title-items-span']}>Gateways</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <GatewaysTable
            gateways={gateways}
            gatewayOptions={gatewayOptions}
            onEdit={handleEditGateway}
            onDelete={handleDeleteGateway}
            onTest={(gatewayId) => {
              const gateway = gateways.find((item) => item.id === gatewayId);
              if (gateway) {
                handleEditGateway(gateway);
              }
            }}
            loading={loading || optionsLoading}
            error={error}
          />
        </div>
      </div>

      {isModalOpen && (
        <ModalGateways
          setIsModalOpen={setIsModalOpen}
          handleSaveGateway={handleSaveGateway}
          handleIntegrationAction={handleIntegrationAction}
          getIntegrationActionLabel={getIntegrationActionLabel}
          setEditingGateway={setEditingGateway}
          editingGateway={editingGateway}
          formData={formData}
          setField={setField}
          resetForm={resetForm}
          gatewayOptions={gatewayOptions}
          loading={loading}
        />
      )}
    </div>
  );
};

export default Gateways;