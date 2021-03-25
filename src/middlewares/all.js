import React from "react";
import { Route } from "react-router-dom";

const AllRoute = ({ component: Component, ...rest }) => {

  return (
    <Route
      children={() => (
        <Component {...rest}/>
      )}
    />
  );
}

export default AllRoute;