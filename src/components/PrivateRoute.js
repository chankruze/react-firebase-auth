/*
Author: chankruze (chankruze@geekofia.in)
Created: Sat Nov 21 2020 04:11:10 GMT+0530 (India Standard Time)

Copyright (c) Geekofia 2020 and beyond
*/

import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
