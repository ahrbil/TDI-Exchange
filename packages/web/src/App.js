import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";
import { CachePersistor } from "apollo-cache-persist";

import "./App.css";
import theme from "./theme";
import Header from "./components/header";
import { Wrapper } from "./components/style";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";
import Footer from "./components/footer";
import { SearchProvider } from "./context/SearchContext";
import Loader, { Wrapper as LoaderWrapper } from "./components/loader";

const cache = new InMemoryCache();
const persistCache = new CachePersistor({
  cache,
  storage: window.localStorage,
  key: "tdi",
  maxSize: false,
  debug: true
});
const apolloClient = new ApolloClient({
  cache,
  // createUploadLink handles the file upload
  link: createUploadLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
  })
});
class App extends React.Component {
  state = {
    loaded: false
  };

  componentDidMount = async () => {
    try {
      persistCache.restore().then(() => this.setState({ loaded: true }));
    } catch (error) {
      console.error("Error restoring the cache");
    }
    // update the state with the client and set loaded to true
    this.setState({
      loaded: true
    });
  };

  render() {
    const { loaded } = this.state;
    if (!loaded) {
      return (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      );
    }
    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>
            <SearchProvider>
              <Header />
              <Wrapper>
                <Routes />
              </Wrapper>
              <Footer />
            </SearchProvider>
          </AuthProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default App;
