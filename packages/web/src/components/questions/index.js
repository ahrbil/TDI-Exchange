import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { ALL_QUESTIONS } from "../../queries";
import Question from "../question";

const Questions = () => (
  <Query query={ALL_QUESTIONS}>
    {({ data, loading, error }) => {
      if (loading) {
        return <h1>loading</h1>;
      }
      if (data && data.allQuestions) {
        const { allQuestions } = data;
        return (
          <QuestionsFeed>
            {allQuestions.map(question => (
              <Question key={question.id} question={question} />
            ))}
          </QuestionsFeed>
        );
      }
      // return (
      //   <QuestionsFeed>
      //     {questions.map(question => (
      //       <Question key={question.id} question={question} />
      //     ))}
      //   </QuestionsFeed>
      // );
      return <span>{error}</span>;
    }}
  </Query>
);

export default Questions;

const QuestionsFeed = styled.div`
  grid-area: questions;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-self: stretch;
  align-items: stretch;
`;
