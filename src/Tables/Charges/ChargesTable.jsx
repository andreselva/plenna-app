import { Ban, History, RefreshCcw } from "lucide-react";
import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import { BankAccountsTableSkeleton } from "../BankAccounts/BankAccountsTableSkeleton";

const GATEWAY_LABELS = {
  PAGAR_ME: "Pagar.me",
  APPMAX: "Appmax",
  ASAAS: "Asaas",
  MERCADO_PAGO: "Mercado Pago",
  STRIPE: "Stripe",
};

const defineGatewayLabel = (gateway) => {
  if (!gateway) return "-";
  return GATEWAY_LABELS[gateway] || gateway;
};

const defineIconUrl = (icon) => {
  if (!icon) return null;

  if (icon.startsWith("http://") || icon.startsWith("https://")) {
    return icon;
  }

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:8001";
  return `${apiBaseUrl.replace(/\/$/, "")}/${icon.replace(/^\//, "")}`;
};

export const ChargesTable = ({
  charges,
  onReprocess,
  onCancel,
  onViewHistory,
  loading,
}) => {
  if (loading) {
    return <BankAccountsTableSkeleton />;
  }

  const columns = [
    {
      header: "Título da cobrança",
      accessor: "title",
      style: { flex: "1 1 35%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Gateway",
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
      renderCell: (charge) => defineGatewayLabel(charge.gateway),
    },
    {
      header: "Valor",
      accessor: "amount",
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
      renderCell: (charge) => "R$ " + (charge.amount ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    },
    {
      header: "Ações",
      style: { flex: "1 1 25%", display: "flex", justifyContent: "center" },
      renderCell: (charge) => (
        <ActionDropdown
          actions={[
            {
              icon: <RefreshCcw size={14} />,
              text: "Reprocessar cobrança",
              handler: () => onReprocess(charge.id),
            },
            {
              icon: <Ban size={14} />,
              text: "Cancelar cobrança",
              handler: () => onCancel(charge.id),
            },
            {
              icon: <History size={14} />,
              text: "Visualizar histórico",
              handler: () => onViewHistory(charge),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={charges}
      noDataMessage="Nenhuma cobrança cadastrada"
    />
  );
};