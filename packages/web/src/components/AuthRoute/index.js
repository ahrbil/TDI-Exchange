import React from "react";
import PropTypes from "prop-types";

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

AuthRoute.propTypes = {
  render: PropTypes.element.isRequired
};
