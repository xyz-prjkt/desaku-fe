import { matchPath } from 'react-router';
import { MenuProps } from 'antd';
import { IRoute } from '../interfaces';

type SidebarMenuItem = Required<MenuProps>['items'][number];

const getRouteToKeyMap = (
  routes: IRoute[],
  basePath = '',
  parentId: string | null = null
): Record<string, string> => {
  const routeToKeyMap: Record<string, string> = {};

  routes.forEach((route) => {
    const fullPath = `${basePath}/${route.path ?? ''}`.replace(/\/+/g, '/');
    routeToKeyMap[fullPath] = route.id ?? '';

    if (route.children) {
      Object.assign(
        routeToKeyMap,
        getRouteToKeyMap(route.children, fullPath, route.id)
      );
    }
  });

  return routeToKeyMap;
};

const getSubmenuToKeysMap = (routes: IRoute[]) => {
  const submenuToKeysMap: SubmenuToKeysMap = {};

  interface SubmenuToKeysMap {
    [key: string]: string[];
  }

  const traverseRoutes = (routes: IRoute[], parentId: string | null = null) => {
    routes.forEach((route) => {
      if (parentId) {
        if (!submenuToKeysMap[parentId]) submenuToKeysMap[parentId] = [];
        if (route.id) {
          submenuToKeysMap[parentId].push(route.id);
        }
      }

      if (route.children) {
        traverseRoutes(route.children, route.id);
      }
    });
  };

  traverseRoutes(routes);
  return submenuToKeysMap;
};

const getSidebarMenuItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: SidebarMenuItem[]
): SidebarMenuItem => {
  return {
    key,
    icon,
    children,
    label,
  } as SidebarMenuItem;
};

const matchRouteKey = ({
  defaultRouteId,
  baseRoute,
  pathname,
  routeMap,
}: {
  defaultRouteId: string;
  baseRoute?: string;
  pathname: string;
  routeMap: Record<string, string>;
}): string => {
  if (pathname === '/' || pathname === baseRoute) return defaultRouteId;
  for (const [route, key] of Object.entries(routeMap)) {
    if (
      matchPath({ path: `${baseRoute ?? ''}${route}/`, end: true }, pathname)
    ) {
      return key;
    }
  }
  return defaultRouteId;
};

export {
  getRouteToKeyMap,
  getSubmenuToKeysMap,
  getSidebarMenuItem,
  matchRouteKey,
};
