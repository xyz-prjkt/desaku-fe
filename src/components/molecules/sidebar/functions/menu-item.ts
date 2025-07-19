import { IRoute } from "../interfaces";

export function mapToProLayoutMenu(routes: IRoute[]): any[] {
  return (routes || [])
    .filter((route) => !route.hidden)
    .map((route) => ({
      path: route.path
        ? route.path.startsWith("/")
          ? route.path
          : `/${route.path}`
        : undefined,
      name: route.id,
      icon: route.icon,
      children: route.children ? mapToProLayoutMenu(route.children) : undefined,
    }));
}
