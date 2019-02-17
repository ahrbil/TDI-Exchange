import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { CachePersistor } from "apollo-cache-persist";

import { GQL_URI } from "./constants";

const cache = new InMemoryCache();

export const persistCache = new CachePersistor({
  cache,
  storage: window.localStorage,
  key: "tdi",
  maxSize: false,
  debug: false
});

export const apolloClient = new ApolloClient({
  cache,
  // createUploadLink handles the file upload
  link: createUploadLink({
    uri: GQL_URI,
    credentials: "include"
  })
});
