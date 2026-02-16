import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import styles from './TenantDetails.module.css';
import Loader from '../../Components/Loader/Loader';
import AlertToast from '../../Components/Alerts/AlertToast';
import { fetchTenantDetails } from '../../Hooks/TenantsManager/TenantsManager';

const Tabs = {
  REGISTER: 'register',
  MODULES: 'modules',
};

const TenantDetails = () => {
  const { clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(Tabs.REGISTER);
  const [tenant, setTenant] = useState(null);
  const [modulesPayload, setModulesPayload] = useState([]);

  const [checkedMap, setCheckedMap] = useState({});

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const details = await fetchTenantDetails(clientId);
        setTenant(details.tenant);
        setModulesPayload(details.modules || []);
      } catch (err) {
        const msg = err?.response?.data?.message || err?.message || 'Erro ao carregar tenant.';
        AlertToast({ icon: 'error', title: msg, timer: 4000 });
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [clientId]);

  useEffect(() => {
    if (!modulesPayload || modulesPayload.length === 0) return;

    const next = {};
    for (const mod of modulesPayload) {
      const sub = mod?.submodules || [];
      for (const s of sub) {
        const key = `${mod.id ?? mod.name}::${s.id ?? s.name}`;
        next[key] = !!(s.enabled ?? s.allowed ?? s.checked);
      }
    }
    setCheckedMap(next);
  }, [modulesPayload]);

  const tenantFields = useMemo(() => {
    if (!tenant) return [];
    return [
      { label: 'ID', value: tenant.id },
      { label: 'Nome', value: tenant.clientName },
      { label: 'E-mail', value: tenant.clientEmail },
      { label: 'Documento', value: tenant.document },
      { label: 'Endereço', value: tenant.address },
      { label: 'Número', value: tenant.number },
      { label: 'Complemento', value: tenant.complement },
      { label: 'Bairro', value: tenant.neighborhood },
      { label: 'Cidade', value: tenant.city },
      { label: 'Estado', value: tenant.state },
      { label: 'CEP', value: tenant.zipCode },
      { label: 'Status', value: tenant.status },
      { label: 'Trial até', value: tenant.trialEndsAt ? new Date(tenant.trialEndsAt).toLocaleString() : '' },
    ].filter((f) => f.value !== undefined);
  }, [tenant]);

  const toggleSubmodule = (moduleRef, subRef) => {
    const key = `${moduleRef}::${subRef}`;
    setCheckedMap((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (loading) return <Loader />;

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>Tenant: {tenant?.clientName || tenant?.id}</span>
            </div>
            <div className={globalStyles['content-title-items-right']}>
              <Link to="/tenants" className={globalStyles.iconButton} style={{ textDecoration: 'none' }}>
                Voltar
              </Link>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          <div className={styles.tabsWrapper}>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === Tabs.REGISTER ? 'active' : ''}`}
                  onClick={() => setActiveTab(Tabs.REGISTER)}
                  type="button"
                >
                  Cadastro
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === Tabs.MODULES ? 'active' : ''}`}
                  onClick={() => setActiveTab(Tabs.MODULES)}
                  type="button"
                >
                  Módulos liberados
                </button>
              </li>
            </ul>
          </div>

          {activeTab === Tabs.REGISTER && (
            <div className={styles.tableWrapper}>
              <table className={globalStyles.expensesTable}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>Campo</th>
                    <th style={{ textAlign: 'left' }}>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {tenantFields.map((f) => (
                    <tr key={f.label}>
                      <td style={{ textAlign: 'left' }}>{f.label}</td>
                      <td style={{ textAlign: 'left' }}>{f.value || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === Tabs.MODULES && (
            <div className={styles.tableWrapper}>
              {(modulesPayload || []).length === 0 ? (
                <div style={{ padding: 12 }}>Nenhum módulo retornado para este tenant.</div>
              ) : (
                (modulesPayload || []).map((mod) => {
                  const moduleRef = mod.id ?? mod.name;
                  const submodules = mod.submodules || [];

                  return (
                    <div key={moduleRef}>
                      <div className={styles.sectionTitle}>{mod.name || `Módulo ${moduleRef}`}</div>
                      <table className={globalStyles.expensesTable}>
                        <thead>
                          <tr>
                            <th style={{ textAlign: 'left' }}>Submódulo</th>
                            <th style={{ width: 140 }}>Liberado</th>
                          </tr>
                        </thead>
                        <tbody>
                          {submodules.length > 0 ? (
                            submodules.map((s) => {
                              const subRef = s.id ?? s.name;
                              const key = `${moduleRef}::${subRef}`;
                              return (
                                <tr key={key}>
                                  <td style={{ textAlign: 'left' }}>{s.name || `Submódulo ${subRef}`}</td>
                                  <td>
                                    <div className={styles.checkboxCell}>
                                      <input
                                        type="checkbox"
                                        checked={!!checkedMap[key]}
                                        onChange={() => toggleSubmodule(moduleRef, subRef)}
                                      />
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan={2} style={{ textAlign: 'center', padding: 10 }}>
                                Nenhum submódulo
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;
