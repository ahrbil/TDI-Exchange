import React from "react";
import { ThemeProvider } from "styled-components";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Router } from "@reach/router";

import "./App.css";
import theme from "./theme";
import Header from "./components/header";
import { Wrapper } from "./components/style";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Footer from "./components/footer";
import QuestionDetails from "./pages/QuestionDetails";
import CreateQuestion from "./components/create-question";
import SignIn from "./pages/SignIn";
import AuthRoute from "./components/AuthRoute";
import Search from "./pages/Search";
import { SearchProvider } from "./context/SearchContext";
import Internships from "./pages/Internships";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  credentials: "include"
});

const App = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SearchProvider>
          <Header />
          <Wrapper>
            <Router>
              <Home path="/" />
              <Internships path="/internships" />
              <QuestionDetails path="/questions/:qid" />
              <Search path="/search/results" />
              <SignIn path="/sign-in" />
              <AuthRoute path="/ask-a-question" render={<CreateQuestion />} />
            </Router>
          </Wrapper>
          <Footer />
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
