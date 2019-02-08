import React, { Suspense } from "react";
import { Router } from "@reach/router";
import ErrorBoundary from "react-error-boundary";

import Loader, { Wrapper } from "./components/loader";

const FallbackLoader = () => (
  <Wrapper>
    <Loader />
  </Wrapper>
);
const ErrorHandler = () => (
  <Wrapper>
    <p>please check your internet connection or try reload the page</p>
  </Wrapper>
);

// lazy load all pages
// import any page like so to be lazily loaded
const Home = React.lazy(() => import("./pages/Home"));
const QuestionDetails = React.lazy(() => import("./pages/QuestionDetails"));
const SignIn = React.lazy(() => import("./pages/SignIn"));
const QuestionSearch = React.lazy(() => import("./pages/QuestionSearch"));
const Internships = React.lazy(() => import("./pages/Internships"));
const PostInternship = React.lazy(() => import("./pages/PostInternship"));
const CreateQuestion = React.lazy(() => import("./components/create-question"));
const AuthRoute = React.lazy(() => import("./components/AuthRoute"));
const Logout = React.lazy(() => import("./pages/Logout"));

// error boundary lets us catch any error if a page failed to load
// we can show a the error or a message
// suspense let us show an loading while pages ar loading
const Routes = () => (
  <ErrorBoundary FallbackComponent={ErrorHandler}>
    <Suspense fallback={<FallbackLoader />}>
      <Router>
        <Home path="/" />
        <Internships path="/internships" />
        <Internships path="/internships/tags/:tag" />
        <QuestionDetails path="/questions/:qid" />
        <QuestionSearch path="/search/results" />
        <SignIn path="/sign-in" />
        <Logout path="/logout" />
        <AuthRoute path="/ask-a-question" render={<CreateQuestion />} />
        <AuthRoute path="/post-an-internship" render={<PostInternship />} />
      </Router>
    </Suspense>
  </ErrorBoundary>
);
export default Routes;
