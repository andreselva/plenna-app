import { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../Auth/Context/AuthContext';

const ModulesContext = createContext(null);

export const ModulesProvider = ({ children }) => {
  const [modulesTree, setModulesTree] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading || !isAuthenticated) {
      setModulesTree([]);
      return;
    }

    let cancelled = false;

    const fetchModulesTree = async () => {
      try {
        setIsLoadingModules(true);
        const { data: response } = await axiosInstance.get('/client-modules');

        if (cancelled) return;
        setModulesTree(response?.payload?.modules?.items ?? []);
      } catch {
        if (cancelled) return;
        setModulesTree([]);
      } finally {
        if (cancelled) return;
        setIsLoadingModules(false);
      }
    };

    fetchModulesTree();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, isLoading]);

  return (
    <ModulesContext.Provider value={{ modulesTree, isLoadingModules }}>
      {children}
    </ModulesContext.Provider>
  );
};

export const useModulesContext = () => {
  const ctx = useContext(ModulesContext);
  if (!ctx) throw new Error('useModulesContext precisa estar dentro de ModulesProvider');
  return ctx;
};
