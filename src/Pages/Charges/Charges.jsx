import AlertToast from "../../Components/Alerts/AlertToast";
import globalStyles from "../../Styles/GlobalStyles.module.css";
import { useCharges } from "../../Hooks/ChargesManager/useCharges";
import { useState } from "react";
import { ModalChargeHistory } from "../../Modals/ModalChargeHistory/ModalChargeHistory";
import { ChargesTable } from "../../Tables/Charges/ChargesTable";
import AlertConfirm from "../../Components/Alerts/AlertConfirm";

const Charges = () => {
  const [selectedChargeHistory, setSelectedChargeHistory] = useState(null);
  const {
    charges,
    loading,
    error,
    reprocessCharge,
    cancelCharge,
    getChargeHistory,
    markAsPaid,
    markAsProcessing,
    markAsAwaitingPayment
  } = useCharges();

  const handleMarkAsPaid = async (chargeId) => {
    const result = await AlertConfirm({
      title: 'Registrar recebimento',
      text: 'Deseja registrar o recebimento desta cobrança?',
      icon: 'info',
    })

    if (result.isConfirmed) {
      await markAsPaid(chargeId);
    }
  }

  const handleMarkAsProcessing = async (chargeId) => {
    const result = await AlertConfirm({
      title: 'Alterar status',
      text: 'Alterar para o status "PROCESSANDO"?',
      icon: 'info'
    })

    if (result.isConfirmed) {
      await markAsProcessing(chargeId);
    }
  }

  const handleMarkAsAwaitingPayment = async (chargeId) => {
    const result = await AlertConfirm({
      title: 'Alterar status',
      text: 'Alterar para o status "AGUARDANDO PAGAMENTO"?',
      icon: 'info'
    })

    if (result.isConfirmed) {
      await markAsAwaitingPayment(chargeId);
    }
  }

  const handleReprocessCharge = async (chargeId) => {
    await reprocessCharge(chargeId);
  };

  const handleCancelCharge = async (chargeId) => {
    const result = await AlertConfirm({
      title: 'Cancelar cobrança',
      text: 'Deseja cancelar a cobrança?',
      icon: 'warning'
    })

    if (result.isConfirmed) {
      const result2 = await AlertConfirm({
        title: 'Ação irreversível',
        text: 'Essa ação é irreversível. Deseja realmente prosseguir?',
        icon: 'warning',
        confirmButtonText: 'Sim, cancelar cobrança'
      })

      if (result2.isConfirmed) {
        await cancelCharge(chargeId);
      }
    }
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
            onPaid={handleMarkAsPaid}
            onProcessing={handleMarkAsProcessing}
            onAwaitingPayment={handleMarkAsAwaitingPayment}
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
