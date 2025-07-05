import { Menu } from 'antd';
import { Link, RouteObject, useLocation } from 'react-router';
import { IMenuItem, IRoute } from './interfaces';
import {
  getRouteToKeyMap,
  getSubmenuToKeysMap,
  matchRouteKey,
} from './functions';
import clsx from 'clsx';

// Adding expandAllByDefault prop to interface
interface ISideBarMenu {
  routes: RouteObject[];
  defaultRouteId: string;
  baseRoute?: string;
  sidebarTheme?: 'light' | 'dark';
  sidebarMode?: 'vertical' | 'horizontal' | 'inline';
  className?: string;
  expandAllByDefault?: boolean;
}

const SideBarMenu = ({
  routes,
  defaultRouteId,
  baseRoute,
  sidebarMode,
  sidebarTheme,
  className,
  expandAllByDefault = false,
}: ISideBarMenu) => {
  const location = useLocation();
  const routeToKeyMap = getRouteToKeyMap(routes as IRoute[]);
  const submenuToKeysMap = getSubmenuToKeysMap(routes as IRoute[]);

  const normalizePath = (path: string): string => {
    if (path === '') return '';
    return path.replace(/\/+$/, '') || '/';
  };

  const mapRoutesToMenuItems = (
    routes: IRoute[],
    parentId?: string
  ): IMenuItem[] =>
    routes
      .filter((route) => !route.hidden)
      .filter(
        (route) => (route.children && route.children.length > 0) || route.path
      )
      .map((route) => {
        const basePath = normalizePath(baseRoute ?? '');
        const routePath = route.path ?? '';
        const fullPath = routePath
          ? `${basePath}${basePath === '/' ? '' : '/'}${routePath}`
          : basePath;
        const cleanedPath = normalizePath(fullPath);
        return {
          key: route.id ?? '',
          icon: route.icon,
          label:
            cleanedPath !== '' ? (
              <Link to={cleanedPath}>{route.id}</Link>
            ) : (
              <span>{route.id}</span>
            ),
          type: route.children ? 'submenu' : 'item',
          children: route.children
            ? mapRoutesToMenuItems(route.children, cleanedPath)
            : undefined,
        };
      });

  const defaultSelectedKey = matchRouteKey({
    defaultRouteId,
    baseRoute,
    pathname: location.pathname,
    routeMap: routeToKeyMap,
  });

  const defaultOpenKeys = expandAllByDefault
    ? Object.keys(submenuToKeysMap)
    : Object.keys(submenuToKeysMap).filter((submenuKey) =>
        submenuToKeysMap[submenuKey].includes(defaultSelectedKey)
      );

  return (
    <Menu
      className={clsx(className)}
      mode={sidebarMode ?? 'inline'}
      theme={sidebarTheme}
      items={mapRoutesToMenuItems(routes as IRoute[])}
      defaultSelectedKeys={[defaultSelectedKey]}
      defaultOpenKeys={defaultOpenKeys}
    />
  );
};

export default SideBarMenu;
