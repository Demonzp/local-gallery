import RouteMiddelwares from "./constants/routeMiddelwares";
import RouteNames from "./constants/routeNames";
import Alboms from "./pages/Alboms";
import Home from "./pages/Home";
import Images from "./pages/Images";

const routes = [
  {
    path: RouteNames.home,
    component: Home,
    middelware: RouteMiddelwares.all,
    exact: true
  },
  {
    path: RouteNames.images,
    component: Images,
    middelware: RouteMiddelwares.all
  },
  {
    path: RouteNames.alboms,
    component: Alboms,
    middelware: RouteMiddelwares.all
  },
];

export default routes;