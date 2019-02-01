import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo";
import { Router } from "@reach/router";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { createUploadLink } from "apollo-upload-client";

import "./App.css";
import theme from "./theme";
import Header from "./components/header";
import { Wrapper } from "./components/style";
import { AuthProvider } from "./context/AuthContext";
import {
  Home,
  QuestionDetails,
  SignIn,
  QuestionSearch,
  Internships,
  PostInternship
} from "./pages";
import Footer from "./components/footer";
import CreateQuestion from "./components/create-question";
import AuthRoute from "./components/AuthRoute";
import { SearchProvider } from "./context/SearchContext";

const client = new ApolloClient({
  // createUploadLink handles the file upload
  link: createUploadLink({
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
              <QuestionSearch path="/search/results" />
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
