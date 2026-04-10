import { useModulesContext } from '../../Modules/Context/ModulesContext';
import { hasModuleByName } from '../../routes/routeAccess';

const useHasModule = (moduleName) => {
  const { modulesTree, isLoadingModules } = useModulesContext();

  return {
    hasModule: hasModuleByName(modulesTree, moduleName),
    isLoadingModules,
  };
};

export default useHasModule;
