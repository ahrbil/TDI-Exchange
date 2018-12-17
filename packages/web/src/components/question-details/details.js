import React from "react";
import styled from "styled-components";
import { QuestionHeader, QuestionBody } from "../question/style";
import { getRelativeTimePosted } from "../../utils";

const Details = ({ question }) => (
  <DetailsContainerStyle>
    <QuestionHeader>
      <img src={question.askedBy.avatar} alt={question.askedBy.userName} />
      <h3>{question.askedBy.userName}</h3>
      <span>{`Asked ${getRelativeTimePosted(question.createdAt)}`}</span>
    </QuestionHeader>
    <QuestionBody>
      <h1>{question.header}</h1>
    </QuestionBody>
    {question.body && <QuestionDetails>{question.body}</QuestionDetails>}
    <H1>{`${question.totalAnswers} Answers`}</H1>
    <AnswersSection>
      {question.answers.map(answer => (
        <AnswerStyle key={answer.id}>
          <QuestionHeader>
            <img
              src={answer.answeredBy.avatar}
              alt={answer.answeredBy.userName}
            />
            <h3>{answer.answeredBy.userName}</h3>
            <span>{getRelativeTimePosted(answer.createdAt)}</span>
          </QuestionHeader>
          <AnswerBody>{answer.body}</AnswerBody>
        </AnswerStyle>
      ))}
    </AnswersSection>
  </DetailsContainerStyle>
);

export default Details;

const DetailsContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 0 0 auto;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: ${props => props.theme.border.rd};
  border: 1px solid #f2f2f2;
  background-color: ${props => props.theme.white};
  ${QuestionHeader} {
    h3 {
      margin-right: auto;
    }
    span {
      color: #4d4d4dc4;
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
  ${QuestionBody} {
    h1 {
      margin: 0;
    }
    padding: 0.7rem 0;
  }
`;

const QuestionDetails = styled.div``;
const AnswersSection = styled.div`
  margin-top: 0.6rem;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.6rem 0;
  border-bottom: 1px solid #e3e3e3;
`;

const AnswerStyle = styled.div`
  margin-top: 1rem;
  &:hover,
  &:active,
  &:focus {
    background-color: #f8f8f8;
  }
`;

const AnswerBody = styled.div`
  margin-left: 46px;
`;
