import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import { Container, ButtonWrapper } from "../style";
import Logo from "../logo";
import Profile from "../profile";
import Button from "../button";
import { AuthConsumer } from "../../context/AuthContext";
import NavItems from "../nav-items";

const Header = () => (
  <AuthConsumer>
    {({ currentUser }) => (
      <HeaderWrapper>
        <StyledHeader>
          <Container>
            <Logo />
            <NavItems />
            {currentUser && <Profile user={{ ...currentUser }} />}
            {!currentUser && (
              <ButtonWrapper>
                <Link to="/sign-in">
                  <Button small>Sign In</Button>
                </Link>
              </ButtonWrapper>
            )}
          </Container>
        </StyledHeader>
      </HeaderWrapper>
    )}
  </AuthConsumer>
);

export default Header;

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: none;
  box-shadow: 0px 1px 1px #d9d9d9;
  background-color: white;
  z-index: 1000;
  > div {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-template-areas: "logo nav . profile";
    grid-template-rows: 1fr;
    max-width: 1080px;
    align-items: center;
    padding: 7px 0px;
  }
`;
const HeaderWrapper = styled.div`
  height: 80px;
`;
