import { Pencil, PlugZap, Trash2 } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { BankAccountsTableSkeleton } from '../BankAccounts/BankAccountsTableSkeleton';

const STATUS_COLORS = {
  true: '#28a745',
  false: '#dc3545',
};

const defineGatewayLabel = (gateway, gatewayOptions) => {
  const option = gatewayOptions.find((item) => item.value === gateway);
  return option?.label || gateway || '-';
};

export const GatewaysTable = ({
  gateways,
  gatewayOptions,
  onEdit,
  onDelete,
  onTest,
  loading,
}) => {
  if (loading) {
    return <BankAccountsTableSkeleton />;
  }

  const handleDeleteWithConfirmation = DeleteConfirmation(onDelete, {
    confirmTitle: 'Deseja realmente excluir?',
    confirmText: 'A exclusão é definitiva!',
    confirmButtonText: 'Excluir',
    cancelButtonText: 'Manter',
    successMessage: 'Gateway excluído!',
    errorMessage: 'Falha ao remover gateway!',
  });

  const columns = [
    {
      header: 'Nome',
      accessor: 'name',
      style: { flex: '1 1 28%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Gateway',
      style: { flex: '1 1 24%', display: 'flex', justifyContent: 'center' },
      renderCell: (gateway) => defineGatewayLabel(gateway.gateway, gatewayOptions),
    },
    {
      header: 'Status',
      style: { flex: '1 1 20%', display: 'flex', justifyContent: 'center' },
      renderCell: (gateway) => {
        const isActive = gateway.isActive ?? false;
        const text = isActive ? 'Ativo' : 'Inativo';
        const baseColor = STATUS_COLORS[isActive];

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
      style: { flex: '1 1 28%', display: 'flex', justifyContent: 'center' },
      renderCell: (gateway) => {
        const actions = [
          {
            icon: <Pencil size={14} />,
            text: 'Editar',
            handler: () => onEdit(gateway),
          },
          {
            icon: <Trash2 size={14} />,
            text: 'Excluir',
            handler: () => handleDeleteWithConfirmation(gateway.id),
          },
        ];

        if (gateway.isActive) {
          actions.unshift({
            icon: <PlugZap size={14} />,
            text: 'Testar integração',
            handler: () => onTest(gateway.id),
          });
        }

        return <ActionDropdown actions={actions} />;
      },
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={gateways}
      noDataMessage="Nenhum gateway cadastrado"
    />
  );
};