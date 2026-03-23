import appRoutes from './appRoutes';

const normalizePath = (path = '') => {
  if (!path) return '/';
  const normalized = path.replace(/\/+$/, '');
  return normalized || '/';
};

const flattenModuleTree = (modulesTree = []) => {
  const flatModules = [];

  const walk = (node) => {
    if (!node) return;
    flatModules.push(node);
    (node.childrenModules || []).forEach(walk);
  };

  modulesTree.forEach(walk);
  return flatModules;
};

export const findRouteConfigByPath = (path) => {
  const normalizedPath = normalizePath(path);

  return appRoutes.find((route) => {
    if (route.path === '*') return false;
    if (route.path.includes('/:')) {
      const staticPath = normalizePath(route.path.split('/:')[0]);
      return normalizedPath === staticPath || normalizedPath.startsWith(`${staticPath}/`);
    }

    return normalizePath(route.path) === normalizedPath;
  });
};

export const hasModuleAccess = (modulesTree = [], targetPath) => {
  if (!targetPath) return true;

  const normalizedTargetPath = normalizePath(targetPath);
  const flatModules = flattenModuleTree(modulesTree);

  return flatModules.some((module) => {
    const moduleRoute = normalizePath(module?.route || '');
    if (!moduleRoute || moduleRoute === '/') return false;

    return (
      normalizedTargetPath === moduleRoute ||
      normalizedTargetPath.startsWith(`${moduleRoute}/`)
    );
  });
};

export const getAccessibleRoutesByPlacement = (modulesTree = [], placement) => {
  return appRoutes.filter((route) => {
    const placements = route.meta?.placements || [];
    if (!placements.includes(placement)) return false;

    const accessPath = route.meta?.accessPath || route.path;
    return hasModuleAccess(modulesTree, accessPath);
  });
};

export const getSidebarRoutes = (modulesTree = []) => {
  return getAccessibleRoutesByPlacement(modulesTree, 'sidebar');
};

export const getSettingsRoutes = (modulesTree = []) => {
  return getAccessibleRoutesByPlacement(modulesTree, 'settings');
};