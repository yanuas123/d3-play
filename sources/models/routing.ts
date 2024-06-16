import { Routes } from '../constants/routing';

export interface Page {
  show(parameter?: [string, string]): void;
  hide(): void;
}

export type RoutesMap = { [page in Routes]: Page }

export interface Router {
  redirect(page: Routes, parameter?: [string, string]): void;
  setRoutesMap(routesMap: RoutesMap): void;
}
