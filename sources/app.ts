import { HomePage } from './pages/home-page/index';
import { Router, RoutesMap } from './models/routing';
import { Routes } from './constants/routing';
import { MainRouter } from './router';
import { SamplePage } from './pages/sample-page/index';

const router: Router = new MainRouter();

const routesMap: RoutesMap = {
  [Routes.home]: new HomePage(router),
  [Routes.sample]: new SamplePage(router)
};

router.setRoutesMap(routesMap);
