import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import IsAuth from "../isAuth";
import { Container, ButtonWrapper } from "../style";
import Logo from "../logo";
import Profile from "../profile";
import Search from "../search";
import Button from "../button";

const Header = () => (
  <IsAuth>
    {currentUser => (
      <StyledHeader>
        <Container>
          <Logo />
          <Search />
          {currentUser && <Profile user={{ ...currentUser }} />}
          {!currentUser && (
            <ButtonWrapper>
              <Link to="/signin">
                <Button>Sign In</Button>
              </Link>
            </ButtonWrapper>
          )}
        </Container>
      </StyledHeader>
    )}
  </IsAuth>
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
  > div {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-template-areas: "logo search area profile";
    grid-template-rows: 1fr;
    max-width: 1080px;
    align-items: center;
    padding: 7px 0px;
  }
`;
