import { fromEvent } from "rxjs";
import { BASIC_ROUTE, Routes } from "./constants/routing";
import { RoutesMap, Page, Router } from "./models/routing";

export class MainRouter implements Router {
  private routesMap: RoutesMap;

  private currentPage: Page;
  private currentRoute: Routes;
  private currentParameter: [string, string];

  constructor() {
    this.lastenNavigationChange();
  }

  public redirect(page: Routes, parameter?: [string, string]): void {
    this.changePage(page, parameter);
    this.refreshBrowserAddressBar();
  }

  public setRoutesMap(routesMap: RoutesMap): void {
    this.routesMap = routesMap;

    this.applyCurrentNavigation(true);
  }

  private changePage(page: Routes, parameter?: [string, string]): void {
    this.currentPage?.hide();

    this.currentRoute = page || BASIC_ROUTE;
    this.currentParameter = parameter;
    this.currentPage = this.routesMap[this.currentRoute];

    this.currentPage.show(parameter);
  }

  private refreshBrowserAddressBar(): void {
    let url: string = '/';
    const parameters: string[] = [];

    if (this.currentRoute && this.currentRoute !== BASIC_ROUTE) {
      const parameter: string = `page=${this.currentRoute}`;

      parameters.push(parameter);
    }

    if (this.currentParameter) {
      const parameter: string = `${this.currentParameter[0]}=${this.currentParameter[1]}`;

      parameters.push(parameter);
    }

    if (parameters.length) {
      url += '?';
      url += parameters.join('&');
    }

    window.history.pushState({}, '', url);
  }

  private lastenNavigationChange(): void {
    fromEvent(window, 'popstate').subscribe(() => {
      this.applyCurrentNavigation();
    });
  }

  private applyCurrentNavigation(force?: boolean): void {
    const url: URL = new URL(document.location.toString());

    const currentRoute: Routes = this.getNavigationRoute(url);
    const currentParameter: [string, string] = this.getNavigationParameter(url);

    const isBasicRouteNotChanged: boolean = currentRoute === BASIC_ROUTE && !this.currentRoute;
    const isRouteNotChanged: boolean = currentRoute === this.currentRoute || isBasicRouteNotChanged;
    const isParameterKeyNotChanged: boolean = currentParameter?.[0] === this.currentParameter?.[0];
    const isParameterValueNotChanged: boolean = currentParameter?.[1] === this.currentParameter?.[1];
    const isParameterNotChanged: boolean = isParameterKeyNotChanged && isParameterValueNotChanged;

    if (!force && isRouteNotChanged && isParameterNotChanged) {
      return;
    }

    this.changePage(currentRoute, currentParameter);
  }

  private getNavigationRoute(url: URL): Routes {
    const currentRoute: Routes = url.searchParams.get('page') as Routes;

    return currentRoute || BASIC_ROUTE;
  }

  private getNavigationParameter(url: URL): [string, string] {
    const params: URLSearchParams = url.searchParams;
    let currentParameter: [string, string];

    params.forEach((value: string, key: string) => {
      if (key === 'page') {
        return;
      }

      if (currentParameter) {
        return;
      }

      currentParameter = [key, value];
    });

    return currentParameter;
  }
}
