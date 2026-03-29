import { Pencil, Trash2 } from "lucide-react";
import { ActionDropdown } from "../../Components/ActionDropdown/ActionDropdown";
import { FlexibleTable } from "../../Components/FlexibleTable/FlexibleTable";
import DeleteConfirmation from "../../Hooks/DeleteConfirmation/DeleteConfirmation";
import { BankAccountsTableSkeleton } from "../BankAccounts/BankAccountsTableSkeleton";

const formatPhone = (value) => {
  const digits = String(value || "").replace(/\D/g, "");

  if (!digits) return "-";

  if (digits.length <= 10) {
    return digits
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return digits
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
};

export const CustomersTable = ({ customers, onEdit, onDelete, loading }) => {
  if (loading) {
    return <BankAccountsTableSkeleton />;
  }

  const handleDeleteWithConfirmation = DeleteConfirmation(onDelete, {
    confirmTitle: "Deseja realmente excluir?",
    confirmText: "A exclusão é definitiva!",
    confirmButtonText: "Excluir",
    cancelButtonText: "Manter",
    successMessage: "Cliente excluído!",
    errorMessage: "Falha ao remover cliente!",
  });

  const columns = [
    {
      header: "Nome",
      accessor: "name",
      style: { flex: "1 1 35%", display: "flex", justifyContent: "center" },
    },
    {
      header: "E-mail",
      accessor: "email",
      style: { flex: "1 1 30%", display: "flex", justifyContent: "center" },
    },
    {
      header: "Telefone",
      style: { flex: "1 1 20%", display: "flex", justifyContent: "center" },
      renderCell: (customer) => formatPhone(customer.phone),
    },
    {
      header: "Ações",
      style: { flex: "1 1 15%", display: "flex", justifyContent: "center" },
      renderCell: (customer) => (
        <ActionDropdown
          actions={[
            {
              icon: <Pencil size={14} />,
              text: "Editar",
              handler: () => onEdit(customer),
            },
            {
              icon: <Trash2 size={14} />,
              text: "Excluir",
              handler: () => handleDeleteWithConfirmation(customer.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={customers}
      noDataMessage="Nenhum cliente cadastrado"
    />
  );
};