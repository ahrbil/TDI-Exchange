import React from "react";
import styled from "styled-components";
import { QuestionHeader } from "../question/style";
import { getRelativeTimePosted } from "../../utils";
import RichRender from "../rich-texte-rendrer";

const Answer = ({ answer }) => (
  <AnswerStyle>
    <AnswerHeader>
      <img src={answer.answeredBy.avatar} alt={answer.answeredBy.userName} />
      <h3>{answer.answeredBy.userName}</h3>
      <span>{getRelativeTimePosted(answer.createdAt)}</span>
    </AnswerHeader>
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

const AnswerHeader = styled(QuestionHeader)`
  h3 {
    margin-right: auto;
  }
  span {
    color: #4d4d4dc4;
    font-size: 0.8rem;
    font-weight: 500;
  }
`;
