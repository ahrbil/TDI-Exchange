import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { QUESTION_WITH_DETAILS } from "../../queries";
import Details from "./details";

const QuestionWithDetails = ({ route }) => (
  <QuestionDetailsContainer>
    <Query query={QUESTION_WITH_DETAILS} variables={{ id: route.qid }}>
      {({ data, loading, error }) => {
        if (loading && !data) {
          return <h1>loading</h1>;
        }
        if (data && data.question) {
          return <Details question={data.question} />;
        }
        return <h1>loading</h1>;
      }}
    </Query>
  </QuestionDetailsContainer>
);
const QuestionDetailsContainer = styled.div`
  grid-area: questions;
`;

export default QuestionWithDetails;
