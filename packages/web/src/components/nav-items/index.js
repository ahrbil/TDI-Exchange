import React from "react";
import { Link } from "@reach/router";
import PropTypes from "prop-types";

import { MenuToggler } from "../header/style";
import Icon from "../icons";
import Logo from "../logo";
import {
  NavItemsStyle,
  NavItemsContainer,
  NavItem,
  Blanket,
  SideNavStyle,
  SideNavContainer,
  NavListItems,
  Wrapper,
  FooterIcons
} from "./style";

const itemsList = [
  { name: "home", url: "/" },
  { name: "internships", url: "/internships" },
  { name: "ask question", url: "/ask-a-question" },
  { name: "post internship", url: "/post-an-internship" }
];

const NavItems = ({ isNavOpen, openNav }) => (
  <>
    <NavItemsStyle>
      <NavItemsContainer>
        <Link to="/">
          <NavItem>home</NavItem>
        </Link>
        <Link to="/internships">
          <NavItem className="nav-item-interns">internships</NavItem>
        </Link>
      </NavItemsContainer>
    </NavItemsStyle>
    {/* side nav on mobile and tablet */}
    {isNavOpen && (
      <SideNavStyle>
        <Blanket onClick={openNav} />
        <SideNavContainer>
          <Wrapper>
            <Logo onClick={openNav} />
            <MenuToggler onClick={openNav}>
              <Icon iconName="clear" />
            </MenuToggler>
          </Wrapper>
          <NavListItems>
            {itemsList.map(item => (
              <Link to={item.url} key={item.name}>
                <NavItem onClick={openNav}>{item.name}</NavItem>
              </Link>
            ))}
          </NavListItems>
          <FooterIcons>
            <a
              href="https://github.com/ahrbil/TDI-Exchange"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon iconName="github" />
            </a>
            <a
              href="hhttps://twitter.com/_ahrbil"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon iconName="twitter" />
            </a>
          </FooterIcons>
        </SideNavContainer>
      </SideNavStyle>
    )}
  </>
);
export default NavItems;

NavItems.propTypes = {
  isNavOpen: PropTypes.bool.isRequired,
  openNav: PropTypes.func.isRequired
};
