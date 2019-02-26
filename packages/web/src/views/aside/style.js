import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 0.6rem;
  border-bottom: 1.4px solid #dfe1e6;
  background-color: white;
  transition: background-color 0.2s ease-in 0s;
  p {
    font-weight: 500;
    font-size: 0.85rem;
    line-height: 1.75;
  }
  &:first-of-type {
    border-top: none;
  }
  &:last-of-type {
    border: none;
  }
  &:hover {
    background-color: #f6f6f6;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const AsideTitle = styled.h1`
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.2;
  margin-bottom: 0.7rem;
`;

export const Wrapper = styled.div`
  button {
    margin-left: auto;
  }
`;
