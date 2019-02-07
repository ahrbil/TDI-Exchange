import React from "react";
import { Query } from "react-apollo";
import PropTypes from "prop-types";

import { CURRENT_USER } from "../queries";

const AuthContext = React.createContext();

export class AuthProvider extends React.PureComponent {
  render() {
    const { children } = this.props;
    return (
      <Query query={CURRENT_USER} fetchPolicy="no-cache">
        {({ data }) => (
          <AuthContext.Provider
            value={{ currentUser: data && data.me ? data.me : null }}
          >
            {children}
          </AuthContext.Provider>
        )}
      </Query>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;

AuthProvider.propTypes = {
  children: PropTypes.element.isRequired
};
