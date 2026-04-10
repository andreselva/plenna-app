import ToggleSwitch from '../../Components/ToogleSwitch/ToggleSwitch';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { darkenHexColor } from '../../Utils/DarkenColor';
import { BankAccountsTableSkeleton } from '../BankAccounts/BankAccountsTableSkeleton';

const STATUS_COLORS = {
  true: '#28a745',
  false: '#dc3545',
};

export const PaymentMethodsTable = ({
  paymentMethods,
  loading,
  toggleLoadingCode,
  onToggleStatus,
}) => {
  if (loading) {
    return <BankAccountsTableSkeleton />;
  }

  const columns = [
    {
      header: 'Nome da forma de pagamento',
      accessor: 'name',
      style: { flex: '1 1 45%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Código da forma de pagamento',
      style: { flex: '1 1 20%', display: 'flex', justifyContent: 'center' },
      renderCell: (paymentMethod) => paymentMethod.code,
    },
    {
      header: 'Situação',
      style: { flex: '1 1 15%', display: 'flex', justifyContent: 'center' },
      renderCell: (paymentMethod) => {
        const isActive = paymentMethod.isActive ?? false;
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
      header: 'Ativar/Desativar',
      style: { flex: '1 1 20%', display: 'flex', justifyContent: 'center' },
      renderCell: (paymentMethod) => (
        <ToggleSwitch
          id={`payment-method-${paymentMethod.code}`}
          checked={!!paymentMethod.isActive}
          onChange={() => onToggleStatus(paymentMethod)}
          disabled={toggleLoadingCode === paymentMethod.code}
        />
      ),
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={paymentMethods}
      noDataMessage="Nenhuma forma de pagamento encontrada"
    />
  );
};