import styled from "styled-components";

export const QuestionHeader = styled.div`
  display: flex;
  align-items: center;
  > img {
    border-radius: 100%;
    margin-right: 8px;
    width: 40px;
    height: 40px;
    background-color: aliceblue;
  }
  > h3 {
    font-weight: 500;
    font-size: 1rem;
  }
`;
export const QuestionBody = styled.div`
  font-weight: 700;
  font-size: 0.7rem;
  > h1 {
    padding-top: 12px;
    line-height: 1.25;
  }
`;
export const QuestionFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #4d4d4dc4;
  font-size: 0.8rem;
  font-weight: 500;
  margin-top: 16px;
  .asked-at {
    font-size: inherit;
    color: inherit;
  }
  .total-answers {
    color: inherit;
    font-size: inherit;
    display: flex;
    align-items: center;
  }
`;
