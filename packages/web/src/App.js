import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import { Router } from "@reach/router";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";

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
import PostInternship from "./pages/postInternship";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include"
  }),
  cache: new InMemoryCache()
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
              <AuthRoute
                path="/post-an-internship"
                render={<PostInternship />}
              />
            </Router>
          </Wrapper>
          <Footer />
        </SearchProvider>
      </AuthProvider>
    </ThemeProvider>
  </ApolloProvider>
);

export default App;
