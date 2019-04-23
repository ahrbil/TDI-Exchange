import React, { Fragment } from "react";
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
  NavArea,
  SearchArea,
  SearchToggler,
  MenuToggler,
  SearchToggleArrow
} from "./style";
import { Container } from "../style";
import Search from "../search";
import Icon from "../icons";
import Notifications from "../notifications";

class Header extends React.Component {
  state = {
    expanded: false,
    isNavOpen: false
  };

  openSearchMode = () => {
    this.setState({ expanded: true });
  };

  closeSearchMode = () => {
    this.setState({ expanded: false });
  };

  toggleOpenNav = () => {
    this.setState(({ isNavOpen }) => ({ isNavOpen: !isNavOpen }));
  };

  render() {
    const { expanded, isNavOpen } = this.state;
    return (
      <AuthConsumer>
        {({ currentUser }) => (
          <HeaderWrapper>
            <StyledHeader>
              <Container>
                {expanded && (
                  <SearchArea expanded={expanded}>
                    <SearchToggleArrow onClick={this.closeSearchMode}>
                      <Icon iconName="arrowLeft" />
                    </SearchToggleArrow>
                    <Search expanded={expanded} />
                  </SearchArea>
                )}
                {!expanded && (
                  <>
                    <LogoArea>
                      <MenuToggler onClick={this.toggleOpenNav}>
                        <Icon iconName="menu" />
                      </MenuToggler>
                      <Logo />
                    </LogoArea>
                    <NavArea>
                      <NavItems
                        openNav={this.toggleOpenNav}
                        isNavOpen={isNavOpen}
                      />
                    </NavArea>
                    <SearchArea>
                      <Search />
                    </SearchArea>
                    <ProfileArea>
                      <SearchToggler onClick={this.openSearchMode}>
                        <Icon iconName="search" />
                      </SearchToggler>
                      {currentUser && (
                        <Fragment>
                          <Notifications />
                          <Profile user={{ ...currentUser }} />
                        </Fragment>
                      )}
                      {!currentUser && (
                        <Link to="/sign-in">
                          <Button small>Sign In</Button>
                        </Link>
                      )}
                    </ProfileArea>
                  </>
                )}
              </Container>
            </StyledHeader>
          </HeaderWrapper>
        )}
      </AuthConsumer>
    );
  }
}

export default Header;
