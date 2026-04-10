import { Pencil, Trash2 } from 'lucide-react';
import { ActionDropdown } from '../../Components/ActionDropdown/ActionDropdown';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import DeleteConfirmation from '../../Hooks/DeleteConfirmation/DeleteConfirmation';
import { BankAccountsTableSkeleton } from '../BankAccounts/BankAccountsTableSkeleton';

const getPaymentMethodLabel = (billingRule, paymentMethods) => {
  const directCode =
    billingRule.paymentMethodCode ??
    billingRule.paymentMethod?.code;

  const directName =
    billingRule.paymentMethodName ??
    billingRule.paymentMethod?.name;

  if (directCode && directName) {
    return `${String(directCode).padStart(2, '0')} - ${directName}`;
  }

  const found = paymentMethods.find(
    (item) => String(item.code) === String(directCode)
  );

  if (found) {
    return `${String(found.code).padStart(2, '0')} - ${found.name}`;
  }

  return '-';
};

const getGatewayLabel = (billingRule, gateways) => {
  const gatewayName = billingRule.gatewayName ?? billingRule.gateway?.name;
  if (gatewayName) return gatewayName;

  const gatewayId = billingRule.gatewayId ?? billingRule.gateway?.id;
  const found = gateways.find((item) => String(item.id) === String(gatewayId));

  return found?.name || '-';
};

export const BillingRulesTable = ({
  billingRules,
  paymentMethods,
  gateways,
  onEdit,
  onDelete,
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
    successMessage: 'Regra de cobrança excluída!',
    errorMessage: 'Falha ao remover regra de cobrança!',
  });

  const columns = [
    {
      header: 'Forma de pagamento',
      style: { flex: '1 1 55%', display: 'flex', justifyContent: 'center' },
      renderCell: (billingRule) => getPaymentMethodLabel(billingRule, paymentMethods),
    },
    {
      header: 'Gateway vinculado',
      style: { flex: '1 1 30%', display: 'flex', justifyContent: 'center' },
      renderCell: (billingRule) => getGatewayLabel(billingRule, gateways),
    },
    {
      header: 'Ações',
      style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
      renderCell: (billingRule) => (
        <ActionDropdown
          actions={[
            {
              icon: <Pencil size={14} />,
              text: 'Editar',
              handler: () => onEdit(billingRule),
            },
            {
              icon: <Trash2 size={14} />,
              text: 'Excluir',
              handler: () => handleDeleteWithConfirmation(billingRule.id),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={billingRules}
      noDataMessage="Nenhuma regra de cobrança cadastrada"
    />
  );
};