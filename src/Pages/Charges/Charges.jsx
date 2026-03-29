import AlertToast from "../../Components/Alerts/AlertToast";
import globalStyles from "../../Styles/GlobalStyles.module.css";
import { useCharges } from "../../Hooks/ChargesManager/useCharges";
import { ChargesTable } from "../../Tables/Charges/ChargesTable";

const Charges = () => {
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
    const history = await getChargeHistory(charge.id);

    if (!history || history.length === 0) {
      AlertToast({
        icon: "info",
        title: "Nenhum histórico encontrado para esta cobrança.",
      });
      return;
    }

    console.log("Histórico da cobrança:", {
      charge,
      history,
    });

    AlertToast({
      icon: "info",
      title: "Histórico carregado. Verifique o console por enquanto.",
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
    </div>
  );
};

export default Charges;