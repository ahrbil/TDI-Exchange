import React from "react";
import { ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Router } from "@reach/router";

import "./App.css";
import theme from "./theme";
import Header from "./components/header";
import { Container, Wrapper } from "./components/style";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Footer from "./components/footer";
import QuestionDetails from "./pages/QuestionDetails";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Container>
          <Header />
          <Wrapper>
            <Router>
              <Home path="/" />
              <QuestionDetails path="/questions/:qid" />
            </Router>
          </Wrapper>
        </Container>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
