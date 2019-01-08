import React from "react";
import styled from "styled-components";

import { QuestionHeader as QuestionHeaderStyle } from "../question/style";
import { getRelativeTimePosted } from "../../utils";
import Icon from "../icons";

const QuestionHeader = ({ user, createdAt, forAnswer }) => {
  const timeTamp = getRelativeTimePosted(createdAt);
  return (
    <QuestionHeaderStyle>
      <div>
        <img src={user.avatar} alt={user.userName} />
        <div>
          <h3>{user.userName}</h3>
          <ReputationContainer toolTipMsg="Reputation Score, contribute to get more">
            <Icon iconName="award" />
            <ReputationScore>{user.repScore}</ReputationScore>
          </ReputationContainer>
        </div>
      </div>
      <span>{forAnswer ? `${timeTamp}` : `Asked ${timeTamp}`}</span>
    </QuestionHeaderStyle>
  );
};

export default QuestionHeader;

const ReputationContainer = styled.div`
  color: #6b6969;
  display: inline-flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  &:after,
  &:before {
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    opacity: 0;
    display: block;
    text-transform: none;
  }
  /* tootTip arrow */
  &:before {
    content: "";
    z-index: 901;
    border: 10px solid transparent;
  }
  /* toolTip content */
  &:after {
    content: "${props => (props.toolTipMsg ? props.toolTipMsg : "")}";
    z-index: 900;
    font-size: 14px;
    font-weight: 500;
    width: 150px;
    line-height: 1.25;
    overflow: hidden;
    padding: 8px 12px;
    border-radius: 4.71px;
    box-shadow: 0px 4px 7px #3a3a3a6b;
    background: #3a3a3a;
    color: white;
  }
  /* controlling the position of tooltip */
  &:after {
    bottom: calc(100% + 8px);
    left: 0;
  }
  &:before {
    bottom: 100%;
    left: -10px;
    transform: translateX(100%);
    border-bottom-width: 0;
    border-top-color: #3a3a3a;
  }
  /*  */
  &:hover:after,
  &:hover:before {
    opacity: 1;
    transition: opacity 0.2s ease-in 0.1s;
  }
  > div {
    width: 16px;
    height: 16px;
    margin-right: 5px;
  }
`;

const ReputationScore = styled.span`
  color: #6b6969;
`;
