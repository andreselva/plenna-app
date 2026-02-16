import { FlexibleTable } from '../../Components/FlexibleTable/FlexibleTable';
import Loader from '../../Components/Loader/Loader';

export const TenantsTable = ({ tenants, loading, onRowClick }) => {
  if (loading) return <Loader />;

  const columns = [
    {
      header: 'ID',
      accessor: 'id',
      style: { flex: '0 0 80px', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Nome',
      accessor: 'clientName',
      style: { flex: '1 1 40%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'E-mail',
      accessor: 'clientEmail',
      style: { flex: '1 1 40%', display: 'flex', justifyContent: 'center' },
    },
    {
      header: 'Status',
      accessor: 'status',
      style: { flex: '0 0 140px', display: 'flex', justifyContent: 'center' },
      renderCell: (tenant) => tenant.status || 'active',
    },
  ];

  return (
    <FlexibleTable
      columns={columns}
      data={tenants || []}
      noDataMessage="Nenhum cliente cadastrado"
      onRowClick={onRowClick}
    />
  );
};
