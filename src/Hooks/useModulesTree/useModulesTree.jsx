import { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useAuth } from '../../Auth/Context/AuthContext';

const useModulesTree = () => {
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

  return {
    modulesTree,
    isLoadingModules,
  };
};

export default useModulesTree;