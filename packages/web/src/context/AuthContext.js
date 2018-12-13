import React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER } from "../queries";

const AuthContext = React.createContext();

export class AuthProvider extends React.PureComponent {
  render() {
    return (
      <Query query={CURRENT_USER}>
        {({ data }) => (
          <AuthContext.Provider
            value={{ currentUser: data && data.me ? data.me : null }}
          >
            {this.props.children}
          </AuthContext.Provider>
        )}
      </Query>
    );
  }
}

export const AuthConsumer = AuthContext.Consumer;
