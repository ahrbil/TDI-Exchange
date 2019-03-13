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
import { apolloClient } from "./apolloClient";

const App = () => (
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

export default App;
