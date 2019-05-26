import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "apollo-link-ws";
import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { GQL_URI, WS_URI } from "./constants";

const cache = new InMemoryCache();
// createUploadLink handles the file upload
const httpLink = createUploadLink({
  uri: GQL_URI,
  credentials: "include"
});

const wsLink = new WebSocketLink({
  uri: WS_URI,
  options: {
    reconnect: true
  }
});

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
export const apolloClient = new ApolloClient({
  cache,
  link
});
