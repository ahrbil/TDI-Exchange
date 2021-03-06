import styled from "styled-components";

import { QuestionHeader, QuestionBody } from "../question/style";

export const DetailsContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex: 0 0 auto;
  margin-bottom: 16px;
  border-radius: ${props => props.theme.border.rd};
  border: 1px solid #f2f2f2;
  background-color: ${props => props.theme.white};
  ${QuestionHeader} {
    padding: 16px;
    span {
      color: #4d4d4dc4;
      font-size: 0.8rem;
      font-weight: 500;
    }
    > div {
      margin-right: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
  }
  ${QuestionBody} {
    padding: 0 16px;
    h1 {
      margin: 0;
      padding: 0;
    }
  }
`;

export const QuestionDetails = styled.div``;
export const AnswersSection = styled.div`
  > div {
    border-bottom: 1px solid #f2f2f2;
  }
`;

export const ActionBarStyle = styled.div`
  background-color: #f8f8f8;
  margin-top: 1.5rem;
  padding: 9px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    font-size: 1.2rem;
    font-weight: 600;
  }
  > div {
    display: flex;
  }
`;
