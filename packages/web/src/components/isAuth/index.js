import React from "react";
import { Query } from "react-apollo";
import { CURRENT_USER } from "../../queries";

const IsAuth = props => (
  <Query query={CURRENT_USER} fetchPolicy="cache-first">
    {({ data }) => {
      if (data && data.me) {
        const currentUser = data.me;
        return props.children(currentUser);
      }
      return props.children();
    }}
  </Query>
);

export default IsAuth;
