import styled from "styled-components";

import { MEDIA_AT_A } from "../../constants";

export const NavItemsStyle = styled.nav`
  display: none;
  @media (min-width: ${MEDIA_AT_A}) {
    display: flex;
    align-items: center;
  }
`;
export const NavItemsContainer = styled.ul`
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
export const NavItem = styled.li`
  padding: 6px 16px;
  letter-spacing: 0.5px;
  border-radius: 3.14px;
  transition: background-color 0.2s ease-in;
  cursor: pointer;
  &:hover {
    background-color: #f5f8ff;
  }
  @media (max-width: ${MEDIA_AT_A}) {
    padding: 10px 16px;
    margin-bottom: 16px;
  }
`;
export const Blanket = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #3b3b3b99;
  z-index: 1099;
`;
export const SideNavStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  @media (min-width: ${MEDIA_AT_A}) {
    display: none;
  }
`;

export const SideNavContainer = styled.nav`
  max-width: 400px;
  height: 100vh;
  background-color: white;
  position: relative;
  z-index: 1100;
  > button {
    margin: 1rem;
  }
`;
export const NavListItems = styled(NavItemsContainer)`
  width: 100%;
  height: 100%;
  padding: 16px;
  font-size: 1rem;
  flex-direction: column;
  align-items: stretch;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  > div svg {
    height: 35px;
  }
`;
