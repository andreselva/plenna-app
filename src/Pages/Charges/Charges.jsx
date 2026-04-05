import AlertToast from "../../Components/Alerts/AlertToast";
import globalStyles from "../../Styles/GlobalStyles.module.css";
import { useCharges } from "../../Hooks/ChargesManager/useCharges";
import { useState } from "react";
import { ModalChargeHistory } from "../../Modals/ModalChargeHistory/ModalChargeHistory";
import { ChargesTable } from "../../Tables/Charges/ChargesTable";

const Charges = () => {
  const [selectedChargeHistory, setSelectedChargeHistory] = useState(null);
  const {
    charges,
    loading,
    error,
    reprocessCharge,
    cancelCharge,
    getChargeHistory,
  } = useCharges();

  const handleReprocessCharge = async (chargeId) => {
    await reprocessCharge(chargeId);
  };

  const handleCancelCharge = async (chargeId) => {
    await cancelCharge(chargeId);
  };

  const handleViewHistory = async (charge) => {
    const chargeHistoryData = await getChargeHistory(charge.id);
    const history = chargeHistoryData?.history ?? [];

    if (!chargeHistoryData?.charge && history.length === 0) {
      AlertToast({
        icon: "info",
        title: "Nenhum histórico encontrado para esta cobrança.",
      });
      return;
    }

    setSelectedChargeHistory({
      charge: chargeHistoryData?.charge ?? charge,
      history,
    });
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles["container-content"]}>
        <div className={globalStyles["content-title"]}>
          <div className={globalStyles["content-title-items"]}>
            <div className={globalStyles["content-title-items-left"]}>
              <span className={globalStyles["title-items-span"]}>Cobranças</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <ChargesTable
            charges={charges}
            onReprocess={handleReprocessCharge}
            onCancel={handleCancelCharge}
            onViewHistory={handleViewHistory}
            loading={loading}
            error={error}
          />
        </div>
      </div>

      <ModalChargeHistory
        isOpen={!!selectedChargeHistory}
        onClose={() => setSelectedChargeHistory(null)}
        charge={selectedChargeHistory?.charge}
        history={selectedChargeHistory?.history ?? []}
      />
    </div>
  );
};

export default Charges;
