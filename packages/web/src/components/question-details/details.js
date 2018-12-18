import React from "react";

import { QuestionHeader, QuestionBody } from "../question/style";
import { getRelativeTimePosted } from "../../utils";
import Answer from "../answer";
import CreateAnswer from "../create-answer";
import { AuthConsumer } from "../../context/AuthContext";
import {
  DetailsContainerStyle,
  QuestionDetails,
  AnswersSection,
  H1,
} from "./style";

const Details = ({ question }) => (
  <AuthConsumer>
    {({ currentUser }) => (
      <DetailsContainerStyle>
        {/* question header style */}
        <QuestionHeader>
          <img src={question.askedBy.avatar} alt={question.askedBy.userName} />
          <h3>{question.askedBy.userName}</h3>
          <span>{`Asked ${getRelativeTimePosted(question.createdAt)}`}</span>
        </QuestionHeader>
        {/* question header */}
        <QuestionBody>
          <h1>{question.header}</h1>
        </QuestionBody>
        {/* question body if it is exists */}
        {question.body && <QuestionDetails>{question.body}</QuestionDetails>}
        {/* total answer a question have */}
        <H1>{`${question.totalAnswers} Answers`}</H1>
        {/* answer section */}
        <AnswersSection>
          {question.answers.map(answer => (
            <Answer key={answer.id} answer={answer} />
          ))}
        </AnswersSection>
        {/* create answer input */}
        {currentUser && <CreateAnswer questionId={question.id} />}
      </DetailsContainerStyle>
    )}
  </AuthConsumer>
);

export default Details;
