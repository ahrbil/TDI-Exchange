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
import CreateQuestion from "./components/create-question";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
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
              <CreateQuestion path="/ask-a-question" />
            </Router>
          </Wrapper>
        </Container>
        <Footer />
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
