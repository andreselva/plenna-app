import { Undo2 } from "lucide-react";
import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import { formatDateToPtBr } from "../../Utils/DateUtils";
import { TransferTableSkeleton } from "./TransferTableSkeleton";

const formatCurrency = (value) => {
  const numericValue = Number(value || 0);
  return numericValue.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

const getAccountName = (accounts, id) => {
  const account = accounts.find((a) => a.id === Number(id));
  return account?.name ?? `Conta #${id}`;
};

export const TransferTable = ({ transfers, accounts = [], onRevert, loading }) => {
  if (loading) {
    return <TransferTableSkeleton />;
  }


  const columns = [
    {
      header: "Conta origem",
      renderCell: (transfer) =>
        transfer.originAccountName ?? getAccountName(accounts, transfer.originAccount),
      style: { flex: "1 1 25%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Conta destino",
      renderCell: (transfer) =>
        transfer.destinationAccountName ?? getAccountName(accounts, transfer.targetAccount),
      style: { flex: "1 1 25%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Valor",
      renderCell: (transfer) => formatCurrency(transfer.amount),
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Data",
      renderCell: (transfer) => formatDateToPtBr(transfer.transferDate),
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Ações",
      style: { flex: "1 1 10%", display: "flex", justifyContent: "center" },
      renderCell: (transfer) => (
        <ActionDropdown
          actions={[
            {
              icon: <Undo2 size={14} />,
              text: "Reverter transferência",
              handler: () => onRevert(transfer),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={transfers}
      noDataMessage="Nenhuma transferência registrada"
    />
  );
};
