import { Pencil, Trash2 } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { BankAccountsTableSkeleton } from './BankAccountsTableSkeleton';

const TYPE_LABELS = {
  CHECKING: 'Conta corrente',
  SAVINGS: 'Poupança',
  DIGITAL_WALLET: 'Carteira digital',
  INVESTMENT: 'Investimento',
};

const ACTIVE_STATUS_COLORS = {
  true: '#28a745',
  false: '#dc3545',
};

const formatCurrency = (value) => {
  const numericValue = Number(value || 0);
  return numericValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

export const BankAccountsTable = ({ accounts, onEdit, onDelete, loading }) => {
  if (loading) {
    return <BankAccountsTableSkeleton />;
  }

  const handleDeleteWithConfirmation = DeleteConfirmation(onDelete, {
    confirmTitle: 'Deseja realmente excluir?',
    confirmText: 'A exclusão é definitiva!',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Manter',
    successMessage: 'Conta bancária excluída!',
    errorMessage: 'Falha ao remover conta bancária!',
  });

  const columns = [
    {
      header: 'Conta',
      accessor: 'name',
      style: { flex: '1 1 24%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Tipo',
      renderCell: (account) => TYPE_LABELS[account.type] || account.type || '-',
      style: { flex: '1 1 18%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Banco / Agência / Conta',
      renderCell: (account) => {
        const parts = [account.bankCode, account.agency, account.accountNumber].filter(Boolean);
        return parts.length ? parts.join(' • ') : '-';
      },
      style: { flex: '1 1 24%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Saldo inicial',
      renderCell: (account) => formatCurrency(account.initialBalance),
      style: { flex: '1 1 18%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Status',
      style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
      renderCell: (account) => {
        const isActive = account.isActive ?? false;
        const text = isActive ? 'Ativa' : 'Inativa';
        const baseColor = ACTIVE_STATUS_COLORS[isActive];

        return (
          <span
            className={globalStyles.statusBadge}
            style={{
              backgroundColor: `${baseColor}33`,
              color: darkenHexColor(baseColor, 25),
              padding: '4px 10px',
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      header: 'Ações',
      style: { flex: '1 1 12%', display: 'flex', justifyContent: 'center' },
      renderCell: (account) => (
        <ActionDropdown
          actions={[
            {
              icon: <Pencil size={14} />,
              text: 'Editar',
              handler: () => onEdit(account),
            },
            {
              icon: <Trash2 size={14} />,
              text: 'Excluir',
              handler: () => handleDeleteWithConfirmation(account.id),
            },
          ]}
        />
      ),
    },
  ];

  return <FlexibleTable columns={columns} data={accounts} noDataMessage="Nenhuma conta bancária cadastrada" />;
};
