import React, { useContext }from 'react';
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function ProtectedRoute({component: Component, ...rest}) {
  const { authState } = useContext(AuthContext);
  return( 
  <Route 
      {...rest}
      render={(props) => {
      if (authState) {
        return <Component />
      } else {
        return <Redirect to={{pathname: '/', state: { from: props.location } }} />
      }
  }}
  />);
}

export default ProtectedRoute;
