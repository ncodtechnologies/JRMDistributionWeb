import { Route } from "react-router-dom";

const RouteWithSubRoutes = (route) => {
  return <Route path={route.path} element={<route.component />} />;
};

export default RouteWithSubRoutes;
