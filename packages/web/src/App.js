import React from "react";
import { ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import "./App.css";
import theme from "./theme";
import Header from "./components/header";
import AllQ from "./components/allq";
import { Container, Wrapper } from "./components/style";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Container>
        <Header />
        <Wrapper>
          <AllQ />
        </Wrapper>
      </Container>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
