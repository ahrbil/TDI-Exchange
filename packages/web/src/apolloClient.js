import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";

import { GQL_URI } from "./constants";

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  cache,
  // createUploadLink handles the file upload
  link: createUploadLink({
    uri: GQL_URI,
    credentials: "include"
  })
});
