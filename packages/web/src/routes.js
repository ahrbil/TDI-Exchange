import React from "react";
import { Router } from "@reach/router";

import {
  Home,
  QuestionDetails,
  SignIn,
  QuestionSearch,
  Internships,
  PostInternship
} from "./pages";
import CreateQuestion from "./components/create-question";
import AuthRoute from "./components/AuthRoute";

const Routes = () => (
  <Router>
    <Home path="/" />
    <Internships path="/internships" />
    <Internships path="/internships/tags/:tag" />
    <QuestionDetails path="/questions/:qid" />
    <QuestionSearch path="/search/results" />
    <SignIn path="/sign-in" />
    <AuthRoute path="/ask-a-question" render={<CreateQuestion />} />
    <AuthRoute path="/post-an-internship" render={<PostInternship />} />
  </Router>
);
export default Routes;
