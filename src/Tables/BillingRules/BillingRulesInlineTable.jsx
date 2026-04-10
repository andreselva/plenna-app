import { Save } from 'lucide-react';
import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import { BankAccountsTableSkeleton } from '../BankAccounts/BankAccountsTableSkeleton';

export const BillingRulesInlineTable = ({
  rows,
  gatewayOptions,
  loading,
  savingCode,
  onGatewayChange,
  onSave,
}) => {
  if (loading) {
    return <BankAccountsTableSkeleton />;
  }

  const columns = [
    {
      header: 'Forma de pagamento',
      accessor: 'paymentMethodLabel',
      style: { flex: '1 1 40%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Gateway vinculado',
      style: { flex: '1 1 25%', display: 'flex', justifyContent: 'center' },
      renderCell: (row) => row.gatewayName || '-',
    },
    {
      header: 'Selecionar gateway',
      style: { flex: '1 1 25%', display: 'flex', justifyContent: 'center' },
      renderCell: (row) => (
        <select
          value={row.gatewayId ?? ''}
          onChange={(e) => onGatewayChange(row.code, e.target.value)}
          style={{
            width: '100%',
            maxWidth: '220px',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #d0d5dd',
            backgroundColor: '#fff',
          }}
          disabled={savingCode === row.code}
        >
          <option value="">Selecione um gateway</option>
          {gatewayOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ),
    },
    {
      header: 'Salvar',
      style: { flex: '1 1 10%', display: 'flex', justifyContent: 'center' },
      renderCell: (row) => (
        <button
          type="button" 
          onClick={() => onSave(row.code)}
          disabled={savingCode === row.code}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: savingCode === row.code ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: savingCode === row.code ? 0.5 : 1,
          }}
        >
          <Save size={18} />
        </button>
      ),
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={rows}
      noDataMessage="Nenhuma forma de pagamento ativa encontrada"
    />
  );
};