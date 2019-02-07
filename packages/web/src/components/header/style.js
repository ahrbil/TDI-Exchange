import styled from "styled-components";

import { Container } from "../style";
import { MEDIA_AT_A } from "../../constants";

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: none;
  box-shadow: 0px 1px 1px #d9d9d9;
  background-color: white;
  z-index: 1000;
  ${Container} {
    display: grid;
    grid-template-columns: auto auto 1fr auto;
    grid-template-areas: "logo nav search profile";
    grid-template-rows: 1fr;
    align-items: center;
    padding: 7px 16px;
    @media (min-width: ${MEDIA_AT_A}) {
      grid-gap: 1rem;
      padding: 7px;
    }
  }
`;
export const HeaderWrapper = styled.div`
  height: 80px;
`;

export const LogoArea = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
`;
export const NavArea = styled.div`
  grid-area: nav;
`;
export const ProfileArea = styled.div`
  grid-area: profile;
  display: flex;
  align-items: center;
`;
export const SearchArea = styled.div`
  display: none;
  display: ${props => (props.expanded ? "flex" : "none")};
  grid-area: logo/nav/search/profile;
  @media (min-width: ${MEDIA_AT_A}) {
    grid-area: search;
    display: flex;
  }
`;

export const SearchToggler = styled.button`
  display: block;
  padding: 0.5rem;
  width: 35px;
  height: 35px;
  margin-right: 1.2rem;
  background: none;
  cursor: pointer;
  border-radius: 3.14px;
  transition: background-color 0.2s ease-in;
  &:hover {
    background-color: #f5f8ff;
  }
  @media (min-width: ${MEDIA_AT_A}) {
    display: none;
  }
`;

export const MenuToggler = styled(SearchToggler)`
  padding: 0.2rem;
  margin-right: 0.5rem;
`;
