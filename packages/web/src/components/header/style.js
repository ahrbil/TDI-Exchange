import styled from "styled-components";

import { Container } from "../style";

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
    grid-template-areas: "logo nav . profile";
    grid-template-rows: 1fr;
    grid-gap: 2rem;
    align-items: center;
    padding: 7px 0px;
  }
`;
export const HeaderWrapper = styled.div`
  height: 80px;
`;

export const LogoArea = styled.div`
  grid-area: logo;
`;
export const NavArea = styled.div`
  grid-area: nav;
`;
export const ProfileArea = styled.div`
  grid-area: profile;
`;
