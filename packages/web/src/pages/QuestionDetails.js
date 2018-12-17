import React from "react";
import { HomeGrid } from "../components/style";
import Aside from "../components/aside";
import QuestionWithDetails from "../components/question-details";

const QuestionDetails = props => (
  <HomeGrid>
    <QuestionWithDetails route={{ ...props }} />
    <Aside />
  </HomeGrid>
);

export default QuestionDetails;
