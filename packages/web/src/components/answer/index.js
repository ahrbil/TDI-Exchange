import React from "react";
import styled from "styled-components";
import RichRender from "../rich-texte-rendrer";
import QuestionHeader from "../question-details/questionHeader";

const Answer = ({ answer }) => (
  <AnswerStyle>
    <QuestionHeader
      user={answer.answeredBy}
      createdAt={answer.createdAt}
      forAnswer
    />
    <RichRender body={answer.body} />
  </AnswerStyle>
);

export default Answer;

const AnswerStyle = styled.div`
  &:hover,
  &:active,
  &:focus {
    background-color: #f8f8f8;
  }
  .markdown {
    padding-top: 0;
  }
`;
