import { useNavigate } from 'react-router-dom';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import { TenantsManager } from '../../Hooks/TenantsManager/TenantsManager';
import { TenantsTable } from '../../Tables/Tenants/TenantsTable';

const Tenants = () => {
  const navigate = useNavigate();
  const { tenants, loading } = TenantsManager();

  const handleOpenTenant = (tenant) => {
    navigate(`/tenants/${tenant.id}`);
  };

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>Tenants</span>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <TenantsTable tenants={tenants} loading={loading} onRowClick={handleOpenTenant} />
        </div>
      </div>
    </div>
  );
};

export default Tenants;
