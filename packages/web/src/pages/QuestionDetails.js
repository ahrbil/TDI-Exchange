import React from "react";
import { HomeGrid } from "../components/style";
import QuestionWithDetails from "../components/question-details";
import ScrollTop from "../components/scrollTop";

const QuestionDetails = props => (
  <ScrollTop>
    <HomeGrid>
      <QuestionWithDetails route={{ ...props }} />
    </HomeGrid>
  </ScrollTop>
);

export default QuestionDetails;
