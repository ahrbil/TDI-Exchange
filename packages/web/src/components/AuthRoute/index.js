import React from "react";

import { AuthConsumer } from "../../context/AuthContext";
import SignIn from "../../pages/SignIn";

const AuthRoute = props => (
  <AuthConsumer>
    {({ currentUser }) => {
      if (currentUser) {
        return props.render;
      }
      return <SignIn />;
    }}
  </AuthConsumer>
);

export default AuthRoute;
