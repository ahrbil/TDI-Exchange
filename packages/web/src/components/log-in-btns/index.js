import React from "react";
import styled from "styled-components";

import AuthBtns from "../button/AuthButtons";
import Icon from "../icons";

const LogInBtns = () => (
  <LogInBtnsStyle>
    <AuthBtns type="facebook">
      <Icon iconName="fb" />
      <span>Sign in with Facebook</span>
    </AuthBtns>
    <AuthBtns type="google">
      <Icon iconName="google" />
      <span>Sign in with Google</span>
    </AuthBtns>
  </LogInBtnsStyle>
);
export default LogInBtns;

const LogInBtnsStyle = styled.div`
  display: grid;
  grid-gap: 1rem;
  padding: 30px 10px;
  span {
    margin: 0 auto;
  }
`;
