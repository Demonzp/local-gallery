import React from "react";
import { Route, Redirect } from "react-router-dom";

import RouteNames from "../constants/routeNames";

const UnknownRoute = ({ ...rest }) => {

  return (
    <Route
      {...rest}
      children={({ location }) => (
        <Redirect
          to={{
            pathname: RouteNames.home,
            state: { from: location }
          }}
        />
      )}
    />
  );
}

export default UnknownRoute;