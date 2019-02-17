import React from "react";
import { ApolloConsumer } from "react-apollo";
import { navigate } from "@reach/router";

import { AuthContext } from "../context/AuthContext";
import { LOGOUT } from "../queries";
import { persistCache } from "../apolloClient";

const logoutAndClear = async apolloClient => {
  await apolloClient.mutate({ mutation: LOGOUT });
  await persistCache.purge();
  await apolloClient.clearStore();
  window.location.replace("/");
};

const LogoutAndClear = props => {
  React.useEffect(() => {
    logoutAndClear(props.apolloClient);
  });
  return null;
};

const Logout = () => {
  const authContext = React.useContext(AuthContext);
  if (authContext.currentUser) {
    return (
      <ApolloConsumer>
        {client => <LogoutAndClear apolloClient={client} />}
      </ApolloConsumer>
    );
  }
  navigate("/sign-in");
  return null;
};

export default Logout;
