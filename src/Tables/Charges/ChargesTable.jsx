import { Ban, History, RefreshCcw, CircleDollarSign, LoaderCircle, CirclePause } from "lucide-react";
import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import { BankAccountsTableSkeleton } from "../BankAccounts/BankAccountsTableSkeleton";
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from "../../Utils/DarkenColor";

const GATEWAY_LABELS = {
  PAGAR_ME: "Pagar.me",
  APPMAX: "Appmax",
  ASAAS: "Asaas",
  MERCADO_PAGO: "Mercado Pago",
  STRIPE: "Stripe",
};

const STATUS = {
  DRAFT: 'Rascunho',
  PROCESSING: 'Processando',
  AWAITING_PAYMENT: 'Aguardando pagamento',
  PAID: 'Paga',
  FAILED: 'Com erro',
  CANCELED: 'Cancelada',
  EXPIRED: 'Expirada'
}

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
  onPaid,
  onAwaitingPayment,
  onProcessing,
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
    // {
    //   header: "Gateway",
    //   style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
    //   renderCell: (charge) => defineGatewayLabel(charge.gateway),
    // },
    {
      header: "Valor",
      accessor: "amount",
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
      renderCell: (charge) => "R$ " + (charge.amount ?? 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
    },
    {
      header: "Status",
      acessor: "status",
      style: { flex: "1 1 15%", display: "flex", justifyContent: "center" },
      renderCell: (charge) => {


          const STATUS_COLOR = {
            DRAFT: '#000000',
            PROCESSING: '#b45309',
            AWAITING_PAYMENT: '#008080',
            PAID: '#008000',
            FAILED: '#FF0000',
            CANCELED: '#808080',
            EXPIRED: '#800000'
          }

          const baseColor = STATUS_COLOR[charge.status]

          return (
            <span
              className={globalStyles.statusBadge}
              style={{
                backgroundColor: `${baseColor}25`,
                color: darkenHexColor(baseColor, 25),
                padding: '4px 10px'
              }}
            >
               {STATUS[charge.status] || '-'}
            </span>
          )
      }
    },
    {
      header: "Ações",
      style: { flex: "1 1 25%", display: "flex", justifyContent: "center" },
      renderCell: (charge) => {
        let chargesActions = [
          {
            icon: <History size={14} />,
            text: "Visualizar histórico",
            handler: () => onViewHistory(charge),
          },
        ]

        if (charge.status === 'AWAITING_PAYMENT') {
          chargesActions.push(
            {
              icon: <CircleDollarSign size={14} />,
              text: "Registrar recebimento",
              handler: () => onPaid(charge.id)
            }
          );
        } 
        
        if (charge.status === 'PROCESSING') {
          chargesActions.push(
            {
              icon: <CirclePause size={14} />,
              text: "Alterar para aguardando pagamento",
              handler: () => onAwaitingPayment(charge.id)
            }
          )
        } 
        
        if (charge.status === 'DRAFT') {
          chargesActions.push(
            {
              icon: <LoaderCircle size={14} />,
              text: "Alterar para processando",
              handler: () => onProcessing(charge.id)
            },
            // {
            //   icon: <RefreshCcw size={14} />,
            //   text: "Reprocessar cobrança",
            //   handler: () => onReprocess(charge.id),
            // },
          )
        } 
        
        if (['PROCESSING', 'AWAITING_PAYMENT', 'DRAFT'].includes(charge.status)) {
          chargesActions.push(
            {
              icon: <Ban size={14} />,
              text: "Cancelar cobrança",
              handler: () => onCancel(charge.id),
            },
          )
        }
  

        return <ActionDropdown actions={chargesActions} />
      }
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