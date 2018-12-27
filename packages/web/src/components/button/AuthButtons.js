import React from "react";
import styled from "styled-components";
import { ButtonStyle } from ".";

const AuthBtns = ({ type, children }) => (
  <a href={`http://localhost:4000/auth/${type}`}>
    <AuthBtnsStyle type={type}>{children}</AuthBtnsStyle>
  </a>
);
const AuthBtnsStyle = styled(ButtonStyle)`
  justify-content: flex-start;
  padding: 6px 16px;
  width: 100%;
  background-color: ${props =>
    props.type === "facebook" ? "rgb(59, 89, 152)" : "rgb(234, 67, 53)"};
  div {
    width: 24px;
    height: 32px;
    margin-right: 16px;
  }
`;

export default AuthBtns;
