import { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import globalStyles from '../../Styles/GlobalStyles.module.css';
import styles from './TenantDetails.module.css';
import Loader from '../../Components/Loader/Loader';
import AlertToast from '../../Components/Alerts/AlertToast';
import { fetchTenantDetails, editTenantsModules, editTenant } from '../../Hooks/TenantsManager/TenantsManager';
import ExpandableRow from '../../Components/ExpansableRow/ExpansableRow';
import { ChevronDown, ChevronRight } from 'lucide-react';

const Tabs = {
  REGISTER: 'register',
  MODULES: 'modules',
};

function getModuleRef(mod) {
  return mod?.id ?? mod?.name;
}

function getSubRef(sub) {
  return sub?.id ?? sub?.name;
}

const ModuleBlock = ({
  mod,
  openMap,
  checkedMap,
  onToggleOpen,
  onModuleChecked,
  onToggleSubmodule,
  getModuleCheckState,
}) => {
  const moduleRef = getModuleRef(mod);
  const submodules = mod?.submodules || [];
  const hasSub = submodules.length > 0;

  const moduleState = getModuleCheckState(moduleRef, submodules);
  const moduleCheckboxRef = useRef(null);

  useEffect(() => {
    if (!moduleCheckboxRef.current) return;
    moduleCheckboxRef.current.indeterminate = moduleState.indeterminate;
  }, [moduleState.indeterminate]);

  return (
    <div className={styles.moduleBlock}>
      <div className={styles.moduleHeader}>
        <div className={styles.moduleTitle}>
          <div className={styles.moduleName}>{mod.displayName || mod.name || moduleRef}</div>
          {hasSub ? (
            <div className={styles.moduleHint}>{submodules.length} submódulo(s)</div>
          ) : (
            <div className={styles.moduleHint}>Sem submódulos</div>
          )}
        </div>

        <div className={styles.checkboxCell}>
          <input
            ref={moduleCheckboxRef}
            type="checkbox"
            checked={moduleState.checked}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => onModuleChecked(moduleRef, submodules, e.target.checked)}
          />
        </div>

        <div className={styles.checkboxCell}>
          {hasSub ? (
            <button
              className={styles.expandButton}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleOpen(moduleRef);
              }}
            >
              {openMap[moduleRef] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
            </button>
          ) : (
            <div style={{ width: 34 }} />
          )}
        </div>
      </div>

      {hasSub && (
        <ExpandableRow isOpen={!!openMap[moduleRef]}>
          <div className={styles.submodulesWrapper}>
            <div className={styles.subTableTitleRow}>
              <div>Submódulo</div>
              <div style={{ textAlign: 'center' }}>Liberado</div>
            </div>

            {submodules.map((s) => {
              const subRef = getSubRef(s);
              const key = `s::${moduleRef}::${subRef}`;
              return (
                <div className={styles.subRow} key={key}>
                  <div>{s.displayName || s.name || subRef}</div>
                  <div className={styles.checkboxCell}>
                    <input
                      type="checkbox"
                      checked={!!checkedMap[key]}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => onToggleSubmodule(moduleRef, subRef)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </ExpandableRow>
      )}
    </div>
  );
};

const EMPTY_FORM = {
  clientName: '',
  clientEmail: '',
  document: '',
  address: '',
  number: '',
  complement: '',
  neighborhood: '',
  city: '',
  state: '',
  zipCode: '',
  status: '',
  trialEndsAt: '',
};

function tenantToForm(tenant) {
  return {
    clientName: tenant.clientName ?? '',
    clientEmail: tenant.clientEmail ?? '',
    document: tenant.document ?? '',
    address: tenant.address ?? '',
    number: tenant.number ?? '',
    complement: tenant.complement ?? '',
    neighborhood: tenant.neighborhood ?? '',
    city: tenant.city ?? '',
    state: tenant.state ?? '',
    zipCode: tenant.zipCode ?? '',
    status: tenant.status ?? 'active',
    trialEndsAt: tenant.trialEndsAt ?? '',
  };
}

const TenantDetails = () => {
  const { clientId } = useParams();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(Tabs.REGISTER);
  const [tenant, setTenant] = useState(null);
  const [modulesPayload, setModulesPayload] = useState([]);
  const [openMap, setOpenMap] = useState({});
  const [checkedMap, setCheckedMap] = useState({});

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

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
    if (!tenant) return;
    setForm(tenantToForm(tenant));
  }, [tenant]);

  const originalCheckedMapRef = useRef({});

  useEffect(() => {
    if (!modulesPayload || modulesPayload.length === 0) return;

    const next = {};
    for (const mod of modulesPayload) {
      const moduleRef = getModuleRef(mod);
      const submodules = mod?.submodules || [];
      const moduleHasAccess = !!mod?.hasAccess;

      if (submodules.length === 0) {
        next[`m::${moduleRef}`] = moduleHasAccess;
      } else {
        for (const s of submodules) {
          const subRef = getSubRef(s);
          const subHasAccess =
            s?.hasAccess === undefined || s?.hasAccess === null ? moduleHasAccess : !!s?.hasAccess;
          next[`s::${moduleRef}::${subRef}`] = subHasAccess;
        }
      }
    }

    setCheckedMap(next);
    setOpenMap({});
    originalCheckedMapRef.current = { ...next };
  }, [modulesPayload]);

function buildModulesDiffPayload(currentMap, modulesPayload) {
    const originalMap = originalCheckedMapRef.current || {};
    const enabled = [];
    const disabled = [];

    if (!modulesPayload) return { enabled, disabled };

    for (const mod of modulesPayload) {
      const parentId = Number(getModuleRef(mod));
      const submodules = mod.submodules || [];

      if (submodules.length === 0) {
        const key = `m::${parentId}`;
        const prev = !!originalMap[key];
        const now = !!currentMap[key];

        if (now && !prev) {
          enabled.push({ moduleId: parentId });
        } else if (!now && prev) {
          disabled.push({ moduleId: parentId });
        }
      } else {
        let prevActiveCount = 0;
        let nowActiveCount = 0;

        submodules.forEach((s) => {
          const subId = Number(getSubRef(s));
          const key = `s::${parentId}::${subId}`;
          if (originalMap[key]) prevActiveCount++;
          if (currentMap[key]) nowActiveCount++;
        });

        if (nowActiveCount === 0 && prevActiveCount > 0) {
          disabled.push({ moduleId: parentId, hasSubmodules: true });
        } else {
          if (prevActiveCount === 0 && nowActiveCount > 0) {
            enabled.push({ moduleId: parentId });
          }

          submodules.forEach((s) => {
            const subId = Number(getSubRef(s));
            const key = `s::${parentId}::${subId}`;
            const prev = !!originalMap[key];
            const now = !!currentMap[key];

            if (now && !prev) {
              enabled.push({ moduleId: subId });
            } else if (!now && prev) {
              disabled.push({ moduleId: subId });
            }
          });
        }
      }
    }

    return { enabled, disabled };
  }

  const toggleOpen = (moduleRef) => {
    setOpenMap((prev) => ({ ...prev, [moduleRef]: !prev[moduleRef] }));
  };

  const getModuleCheckState = (moduleRef, submodules) => {
    if (!submodules || submodules.length === 0) {
      return { checked: !!checkedMap[`m::${moduleRef}`], indeterminate: false };
    }

    const total = submodules.length;
    let enabled = 0;
    for (const s of submodules) {
      if (checkedMap[`s::${moduleRef}::${getSubRef(s)}`]) enabled++;
    }

    if (enabled === 0) return { checked: false, indeterminate: false };
    if (enabled === total) return { checked: true, indeterminate: false };
    return { checked: false, indeterminate: true };
  };

  const setModuleChecked = (moduleRef, submodules, value) => {
    setCheckedMap((prev) => {
      const next = { ...prev };
      if (!submodules || submodules.length === 0) {
        next[`m::${moduleRef}`] = value;
        return next;
      }
      for (const s of submodules) {
        next[`s::${moduleRef}::${getSubRef(s)}`] = value;
      }
      return next;
    });
  };

  const toggleSubmodule = (moduleRef, subRef) => {
    setCheckedMap((prev) => {
      const key = `s::${moduleRef}::${subRef}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const onChangeField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const onClickEdit = () => setIsEditing(true);

  const onClickCancelEdit = () => {
    if (tenant) setForm(tenantToForm(tenant));
    setIsEditing(false);
  };

  const onClickSave = async () => {
    const payload = {
      clientName: form.clientName,
      clientEmail: form.clientEmail,
      document: form.document,
      address: form.address,
      number: form.number,
      complement: form.complement,
      neighborhood: form.neighborhood,
      city: form.city,
      state: form.state,
      zipCode: form.zipCode,
      status: form.status,
      trialEndsAt: form.trialEndsAt || null,
      id: Number(clientId)
    };

    setLoading(true);
    const res = await editTenant(payload);
    if (res === true) {
      setTenant(payload);
      setIsEditing(false);
      AlertToast({
        icon: 'success',
        title: 'Cliente salvo com sucesso.',
        timer: 3500,
      });
    }
    setLoading(false);
  };

  const onClickSaveModules = async () => {
    const diffPayload = buildModulesDiffPayload(checkedMap, modulesPayload);
    if (diffPayload.enabled.length === 0 && diffPayload.disabled.length === 0) {
      AlertToast({ icon: 'info', title: 'Nenhuma alteração de módulos.', timer: 2500 });
      return;
    }
    
    setLoading(true);
    const res = await editTenantsModules(clientId, diffPayload);
    if (res === true) {
      originalCheckedMapRef.current = { ...checkedMap };
      AlertToast({
        icon: 'success',
        title: 'Módulos salvos com sucesso!',
        timer: 3500
      })
    }
    setLoading(false);
  };

  if (loading) return <Loader />;

  return (
    <div className={globalStyles.container}>
      <div className={globalStyles['container-content']}>
        <div className={globalStyles['content-title']}>
          <div className={globalStyles['content-title-items']}>
            <div className={globalStyles['content-title-items-left']}>
              <span className={globalStyles['title-items-span']}>
                Cliente: {tenant?.clientName || tenant?.id}
              </span>
            </div>
            <div className={globalStyles['content-title-items-right']}>
              <Link to="/tenants" className={globalStyles.iconButton} style={{ textDecoration: 'none' }}>
                Voltar
              </Link>
            </div>
          </div>
        </div>

        <div className={globalStyles.card}>
          {/* ── Tabs ── */}
          <div className={styles.tabsWrapper}>
            <div className={styles.tabs}>
              <button
                type="button"
                className={`${styles.tabButton} ${activeTab === Tabs.REGISTER ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab(Tabs.REGISTER)}
              >
                Cadastro
              </button>
              <button
                type="button"
                className={`${styles.tabButton} ${activeTab === Tabs.MODULES ? styles.tabButtonActive : ''}`}
                onClick={() => setActiveTab(Tabs.MODULES)}
              >
                Módulos liberados
              </button>
            </div>
          </div>

          {activeTab === Tabs.REGISTER && (
            <>
              <div className={styles.headerRow}>
                <div className={styles.sectionTitle}>Dados do cliente</div>
                <div className={styles.actionButtons}>
                  {!isEditing ? (
                    <button type="button" className={styles.primaryBtn} onClick={onClickEdit}>
                      Editar
                    </button>
                  ) : (
                    <>
                      <button type="button" className={styles.secondaryBtn} onClick={onClickCancelEdit}>
                        Cancelar
                      </button>
                      <button type="button" className={styles.primaryBtn} onClick={onClickSave}>
                        Salvar
                      </button>
                    </>
                  )}
                </div>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <div className={styles.label}>Nome</div>
                  {isEditing ? (
                    <input className={styles.input} value={form.clientName} onChange={onChangeField('clientName')} />
                  ) : (
                    <div className={styles.readonlyBox}>{form.clientName || '-'}</div>
                  )}
                </div>

                <div className={styles.field}>
                  <div className={styles.label}>E-mail</div>
                  {isEditing ? (
                    <input className={styles.input} value={form.clientEmail} onChange={onChangeField('clientEmail')} />
                  ) : (
                    <div className={styles.readonlyBox}>{form.clientEmail || '-'}</div>
                  )}
                </div>

                <div className={styles.field}>
                  <div className={styles.label}>Documento</div>
                  {isEditing ? (
                    <input className={styles.input} value={form.document} onChange={onChangeField('document')} />
                  ) : (
                    <div className={styles.readonlyBox}>{form.document || '-'}</div>
                  )}
                </div>

                <div className={styles.field}>
                  <div className={styles.label}>CEP</div>
                  {isEditing ? (
                    <input className={styles.input} value={form.zipCode} onChange={onChangeField('zipCode')} />
                  ) : (
                    <div className={styles.readonlyBox}>{form.zipCode || '-'}</div>
                  )}
                </div>

                <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.label}>Endereço</div>
                  {isEditing ? (
                    <input className={styles.input} value={form.address} onChange={onChangeField('address')} />
                  ) : (
                    <div className={styles.readonlyBox}>{form.address || '-'}</div>
                  )}
                </div>

                <div className={styles.inlineGrid} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.field}>
                    <div className={styles.label}>Número</div>
                    {isEditing ? (
                      <input className={styles.input} value={form.number} onChange={onChangeField('number')} />
                    ) : (
                      <div className={styles.readonlyBox}>{form.number || '-'}</div>
                    )}
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Complemento</div>
                    {isEditing ? (
                      <input className={styles.input} value={form.complement} onChange={onChangeField('complement')} />
                    ) : (
                      <div className={styles.readonlyBox}>{form.complement || '-'}</div>
                    )}
                  </div>
                </div>

                <div className={styles.inlineGrid} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.field}>
                    <div className={styles.label}>Bairro</div>
                    {isEditing ? (
                      <input className={styles.input} value={form.neighborhood} onChange={onChangeField('neighborhood')} />
                    ) : (
                      <div className={styles.readonlyBox}>{form.neighborhood || '-'}</div>
                    )}
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Cidade</div>
                    {isEditing ? (
                      <input className={styles.input} value={form.city} onChange={onChangeField('city')} />
                    ) : (
                      <div className={styles.readonlyBox}>{form.city || '-'}</div>
                    )}
                  </div>
                </div>

                <div className={styles.inlineGrid} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.field}>
                    <div className={styles.label}>Estado</div>
                    {isEditing ? (
                      <input className={styles.input} value={form.state} onChange={onChangeField('state')} />
                    ) : (
                      <div className={styles.readonlyBox}>{form.state || '-'}</div>
                    )}
                  </div>
                  <div className={styles.field}>
                    <div className={styles.label}>Status</div>
                    {isEditing ? (
                      <select className={styles.input} value={form.status} onChange={onChangeField('status')}>
                        <option value="active">active</option>
                        <option value="suspended">suspended</option>
                      </select>
                    ) : (
                      <div className={styles.readonlyBox}>{form.status || '-'}</div>
                    )}
                  </div>
                </div>

                <div className={styles.field} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.label}>Trial até</div>
                  {isEditing ? (
                    <input
                      className={styles.input}
                      value={form.trialEndsAt || ''}
                      onChange={onChangeField('trialEndsAt')}
                      placeholder="Ex: 2026-12-31 23:59:59"
                    />
                  ) : (
                    <div className={styles.readonlyBox}>
                      {form.trialEndsAt ? new Date(form.trialEndsAt).toLocaleString() : '-'}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === Tabs.MODULES && (
            <>
              <div className={styles.headerRow}>
                <div className={styles.sectionTitle}>Módulos liberados</div>
                <div className={styles.actionButtons}>
                  <button type="button" className={styles.primaryBtn} onClick={onClickSaveModules}>
                    Salvar módulos
                  </button>
                </div>
              </div>

              <div className={styles.modulesGrid}>
                {modulesPayload.map((mod) => (
                  <ModuleBlock
                    key={getModuleRef(mod)}
                    mod={mod}
                    openMap={openMap}
                    checkedMap={checkedMap}
                    onToggleOpen={toggleOpen}
                    onModuleChecked={setModuleChecked}
                    onToggleSubmodule={toggleSubmodule}
                    getModuleCheckState={getModuleCheckState}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TenantDetails;