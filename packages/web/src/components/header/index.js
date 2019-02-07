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
  NavArea,
  SearchArea,
  SearchToggler,
  MenuToggler
} from "./style";
import { Container } from "../style";
import Search from "../search";
import Icon from "../icons";

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

  componentDidMount = () => {
    window.addEventListener("resize", this.closeSearchMode);
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.closeSearchMode);
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
                    <SearchToggler onClick={this.closeSearchMode}>
                      <Icon iconName="arrowLeft" />
                    </SearchToggler>
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
                      {currentUser && <Profile user={{ ...currentUser }} />}
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
