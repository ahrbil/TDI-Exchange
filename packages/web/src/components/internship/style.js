import styled from "styled-components";

import { QuestionContainer } from "../question";

export const InternshipCard = styled(QuestionContainer)`
  flex-direction: row;
  align-items: flex-start;
  cursor: default;
  &:hover {
    box-shadow: 1px 1px ${props => props.theme.shadow.primary};
  }
`;
export const InternshipAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  min-width: 4rem;
  min-height: 4rem;
  margin-right: 16px;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background: aliceblue;
  }
`;
export const InternshipContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  h1 {
    font-size: 1.1rem;
    font-weight: 700;
    line-height: 1.25;
  }
`;
export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0.7rem 0px;
`;
export const Tag = styled.div`
  display: flex;
  height: 25px;
  padding: 0px 8px;
  margin-top: 0.6rem;
  border: 1px solid #f8f8f8;
  border-radius: 4.71px;
  margin-right: 0.6rem;
  transition: box-shadow 0.1s linear;
  box-shadow: 0px 3px 2px ${props => props.theme.shadow.primary};
  cursor: pointer;
  &:hover,
  &:focus {
    box-shadow: 0px 6px 6px ${props => props.theme.shadow.primary};
  }
`;
export const TagText = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
`;
export const Location = styled.h3`
  font-size: 1rem;
  padding: 4px 0px;
  color: #402faf;
  text-decoration: underline;
`;
export const LocationContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0.4rem 0px;
  > div {
    width: 21px;
    height: 1.2rem;
    margin-right: 0.3rem;
    color: #434343;
  }
`;
export const PostedTime = styled.span`
  align-self: flex-end;
  font-size: 0.8rem;
  font-weight: 600;
  color: #5f5f5f;
`;
