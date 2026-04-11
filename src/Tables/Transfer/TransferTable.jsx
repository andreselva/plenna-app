import { Trash2 } from "lucide-react";
import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
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

export const TransferTable = ({ transfers, accounts = [], onDelete, loading }) => {
  if (loading) {
    return <TransferTableSkeleton />;
  }

  const handleDeleteWithConfirmation = DeleteConfirmation(onDelete, {
    confirmTitle: "Deseja realmente excluir?",
    confirmText: "A exclusão da transferência é definitiva!",
    confirmButtonText: "Excluir",
    cancelButtonText: "Manter",
    successMessage: "Transferência excluída!",
    errorMessage: "Falha ao excluir transferência!",
  });

  const columns = [
    {
      header: "Conta origem",
      renderCell: (transfer) =>
        transfer.originAccountName ?? getAccountName(accounts, transfer.accountId),
      style: { flex: "1 1 25%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Conta destino",
      renderCell: (transfer) =>
        transfer.destinationAccountName ?? getAccountName(accounts, transfer.payableId),
      style: { flex: "1 1 25%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Valor",
      renderCell: (transfer) => formatCurrency(transfer.value),
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Data",
      renderCell: (transfer) => formatDateToPtBr(transfer.paymentDate),
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Ações",
      style: { flex: "1 1 10%", display: "flex", justifyContent: "center" },
      renderCell: (transfer) => (
        <ActionDropdown
          actions={[
            {
              icon: <Trash2 size={14} />,
              text: "Excluir",
              handler: () => handleDeleteWithConfirmation(transfer.id),
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
