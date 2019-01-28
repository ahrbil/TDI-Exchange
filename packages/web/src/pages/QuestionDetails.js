import React from "react";
import { HomeGrid } from "../components/style";
import Aside from "../components/aside";
import QuestionWithDetails from "../components/question-details";
import ScrollTop from "../components/scrollTop";

const QuestionDetails = props => (
  <ScrollTop>
    <HomeGrid>
      <QuestionWithDetails route={{ ...props }} />
      <Aside />
    </HomeGrid>
  </ScrollTop>
);

export default QuestionDetails;
