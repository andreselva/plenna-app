import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import AlertToast from '../../Components/Alerts/AlertToast';

const endpoint = '/saas/tenants';

export const TenantsManager = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTenants = async () => {
    setLoading(true);
    try {
      const { data: response, status } = await axiosInstance.get(endpoint);
      if (response && status >= 200 && status <= 204) {
        const list = response?.payload?.tenants ?? response?.payload?.clients ?? response?.payload ?? [];
        setTenants(list);
        return;
      }
      console.error(response, status);
    } catch (err) {
      const errorMessage = err?.response?.data?.message || 'Erro ao carregar tenants.';
      AlertToast({ icon: 'error', title: errorMessage, timer: 4000 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  return {
    tenants,
    loading,
    error: null,
    refetch: fetchTenants,
  };
};

export const fetchTenantDetails = async (clientId) => {
  const { data: response, status } = await axiosInstance.get(`${endpoint}/${clientId}`);
  if (response && status >= 200 && status <= 204) {
    const payload = response?.payload ?? {};
    return {
      tenant: payload.tenant ?? payload.client ?? payload,
      modules: payload.modules ?? [],
    };
  }
  throw new Error('Falha ao carregar detalhes do tenant.');
};

export const editTenantsModules = async (clientId, modulesDiff) => {
  const safeModulesDiff = {
    enabled: Array.isArray(modulesDiff?.enabled) ? modulesDiff.enabled : [],
    disabled: Array.isArray(modulesDiff?.disabled) ? modulesDiff.disabled : [],
  };

  const res = await axiosInstance.patch(
    `${endpoint}/modules/edit/${clientId}`,
    safeModulesDiff
  );

  if (res.status >= 200 && res.status < 300) {
    return true;
  }

  throw new Error('Falha ao editar módulos do tenant.');
};

export const editTenant = async (tenant) => {
  const res = await axiosInstance.patch(`${endpoint}/edit`, tenant);

  if (res.status >= 200 && res.status <= 204) {
    return true;
  }
  throw new Error('Falha ao editar as informações do cliente.');
}