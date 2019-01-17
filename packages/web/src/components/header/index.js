import React from "react";
import { Link } from "@reach/router";

import Logo from "../logo";
import Profile from "../profile";
import Button from "../button";
import { AuthConsumer } from "../../context/AuthContext";
import NavItems from "../nav-items";
import {
  HeaderWrapper,
  StyledHeader,
  LogoArea,
  ProfileArea,
  NavArea
} from "./style";
import { Container } from "../style";

const Header = () => (
  <AuthConsumer>
    {({ currentUser }) => (
      <HeaderWrapper>
        <StyledHeader>
          <Container>
            <LogoArea>
              <Logo />
            </LogoArea>
            <NavArea>
              <NavItems />
            </NavArea>
            <ProfileArea>
              {currentUser && <Profile user={{ ...currentUser }} />}
              {!currentUser && (
                <Link to="/sign-in">
                  <Button small>Sign In</Button>
                </Link>
              )}
            </ProfileArea>
          </Container>
        </StyledHeader>
      </HeaderWrapper>
    )}
  </AuthConsumer>
);

export default Header;
