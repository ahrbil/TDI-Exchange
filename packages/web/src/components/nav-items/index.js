import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";

import Search from "../search";

const NavItems = () => (
  <NavItemsStyle>
    <NavItemsContainer>
      <Link to="/">
        <NavItem>home</NavItem>
      </Link>
      <Link to="/internships">
        <NavItem className="nav-item-interns">internships</NavItem>
      </Link>
    </NavItemsContainer>
    <Search />
  </NavItemsStyle>
);
export default NavItems;

const NavItemsStyle = styled.nav`
  display: flex;
  align-items: center;
`;
const NavItemsContainer = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  font-weight: 500;
  text-transform: uppercase;
  font-size: 0.9rem;
  padding-right: 16px;
  .nav-item-interns {
    color: ${props => props.theme.color.secondary};
  }
`;
const NavItem = styled.li`
  padding: 6px 16px;
  letter-spacing: 0.5px;
  border-radius: 3.14px;
  transition: background-color 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: #f5f8ff;
  }
`;
