import styled from "styled-components";

import { QuestionHeader, QuestionBody } from "../question/style";

export const DetailsContainerStyle = styled.div`
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

export const QuestionDetails = styled.div``;
export const AnswersSection = styled.div`
  margin-top: 0.6rem;
`;

export const H1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
  padding: 0.6rem 0;
  border-bottom: 1px solid #e3e3e3;
`;
