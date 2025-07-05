import { IRoute } from "@/components/molecules/sidebar/interfaces";

interface IPermission {
  name: string;
}

export const pathMatchesPattern = (
  pathname: string,
  pattern: string
): boolean => {
  const regex = new RegExp(`^${pattern}$`);
  return regex.test(pathname);
};

export const normalizePath = (path: string): string =>
  path.replace(/\/+$/, "") || "/";

const processPathForPatterns = (path: string): string => {
  return path.replace(/:([^/]+)/g, "[^/]+");
};

export const routeMiddleware = <T extends IPermission>(
  routes: IRoute,
  permissions: T[] = [],
  { basePath }: { basePath?: string } = {}
) => {
  const allowedPermissionsSet = new Set(permissions.map((perm) => perm.name));
  const result: {
    allowedRoutes: IRoute[];
    allowedPaths: (string | undefined)[];
    allowedFullPaths: Set<string>;
    allowedPermissions: (string | undefined)[];
  } = {
    allowedRoutes: [],
    allowedPaths: [],
    allowedFullPaths: new Set(),
    allowedPermissions: [],
  };

  const normalizeBasePath = (path: string): string =>
    path === "" ? "/" : path.replace(/\/+$/, "");

  const generateFullPath = (base: string, path?: string): string => {
    const normalizedBase = normalizeBasePath(base);
    if (!path || path === "/") return normalizedBase;
    return `${normalizedBase}/${path.replace(/^\//, "")}`.replace(/\/+$/, "");
  };

  const hasPermission = (routePermissions?: string[]): boolean => {
    if (!routePermissions || routePermissions.length === 0) {
      return true; // No permission required
    }

    // Check if user has ANY of the required permissions (OR logic)
    return routePermissions.some((permission) =>
      allowedPermissionsSet.has(permission)
    );
  };

  const filterRoutes = (routeList: IRoute[], currentBase: string): IRoute[] => {
    return routeList
      .map((route) => {
        const newBase = generateFullPath(currentBase, route.path);
        const hasRequiredPermission = hasPermission(route.allowedPermission);
        const children = route.children
          ? filterRoutes(route.children, newBase)
          : [];
        if (hasRequiredPermission || children.length > 0) {
          const filteredRoute: IRoute = {
            ...route,
            children: children.length > 0 ? children : undefined,
          };
          if (hasRequiredPermission) {
            result.allowedRoutes.push(filteredRoute);
            result.allowedPaths.push(route.path);
            result.allowedFullPaths.add(
              processPathForPatterns(normalizePath(newBase))
            );
            result.allowedPermissions.push(route.allowedPermission?.[0]);
          }
          return filteredRoute;
        }
        return null;
      })
      .filter((r): r is IRoute => r !== null);
  };
  return {
    allowedRoutes: filterRoutes(routes.children ?? [], basePath ?? ""),
    allowedPaths: result.allowedPaths,
    allowedFullPaths: Array.from(result.allowedFullPaths),
    allowedPermissions: result.allowedPermissions,
  };
};

export default routeMiddleware;
