import React from "react";
import { Route } from "react-router-dom";

const AllRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      {...rest}
      children={() => (
        <Component />
      )}
    />
  );
}

export default AllRoute;