import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import { Link } from "@reach/router";
import { QuestionHeader, QuestionBody, QuestionFooter } from "./style";
import { getRelativeTimePosted } from "../../utils";
import Icon from "../icons";

const Question = ({ question }) => (
  <Link to={`/questions/${question.id}`}>
    <QuestionContainer>
      <QuestionHeader>
        <img src={question.askedBy.avatar} alt={question.askedBy.userName} />
        <h3>{question.askedBy.userName}</h3>
      </QuestionHeader>
      <QuestionBody>
        <h1>{question.header}</h1>
      </QuestionBody>
      <QuestionFooter>
        <div className="total-answers">
          <Icon
            iconName="answers"
            style={{ width: "18px", height: "18px", marginRight: "2px" }}
          />
          <span>
            <strong
              style={{ fontWeight: "700", fontSize: "0.9rem", padding: "5px" }}
            >
              {question.totalAnswers}
            </strong>
            {`Answer${question.totalAnswers > 1 ? "s" : ""}`}
          </span>
        </div>
        <Divider />
        <span className="asked-at">
          {`Asked ${getRelativeTimePosted(question.createdAt)}`}
        </span>
      </QuestionFooter>
    </QuestionContainer>
  </Link>
);

export default Question;

Question.propTypes = {
  question: PropTypes.shape({
    header: PropTypes.string,
    createdAt: PropTypes.string,
    askedBy: PropTypes.shape({
      userName: PropTypes.string,
      avatar: PropTypes.string,
    }),
  }).isRequired,
};

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 0 0 auto;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: ${props => props.theme.border.rd};
  border: 1px solid #f2f2f2;
  box-shadow: 1px 1px ${props => props.theme.shadow.primary};
  transition: box-shadow 0.2s ease-in;
  background-color: ${props => props.theme.white};
  cursor: pointer;
  &:hover,
  &:active,
  &:focus {
    box-shadow: 2px 2px 11px ${props => props.theme.shadow.primary};
  }
`;

const Divider = styled.div`
  margin: 0 15px;
  padding: 10px 0;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -0.5px;
    margin-left: -2px; /*height / 2*/
    background-color: #4d4d4dc4;
    border-radius: 100%;
    width: 4px;
    height: 4px;
  }
`;
