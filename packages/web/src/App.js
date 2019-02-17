import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";

import "./App.css";
import theme from "./theme";
import Header from "./components/header";
import { Wrapper } from "./components/style";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./routes";
import Footer from "./components/footer";
import { SearchProvider } from "./context/SearchContext";
import Loader, { Wrapper as LoaderWrapper } from "./components/loader";
import { persistCache, apolloClient } from "./apolloClient";

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
