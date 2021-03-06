import React from "react";
import styled from "styled-components";

import LogInBtns from "../components/log-in-btns";

const SignIn = () => (
  <SignInContainer>
    <div>
      <h1>Get started by signing in</h1>
      <p>spreed your help and grow your knowledge</p>
    </div>
    <LogInBtns />
  </SignInContainer>
);

export default SignIn;

const SignInContainer = styled.div`
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 16px;
  h1 {
    font-size: 2.2rem;
    font-weight: 800;
    letter-spacing: 0.7px;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.2rem;
    font-weight: 500;
    color: rgb(105, 105, 105);
    line-height: 1.5;
    margin-bottom: 0.6rem;
  }
`;
