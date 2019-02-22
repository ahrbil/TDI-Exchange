import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import { ReactComponent as TDIsvg } from "../svgs/tdi.svg";

const Logo = () => (
  <LogoStyle>
    <Link to="/">
      <TDIsvg />
    </Link>
  </LogoStyle>
);

const LogoStyle = styled.div`
  > a {
    display: flex;
  }
  svg {
    height: 21px;
    width: auto;
  }
`;

export default Logo;
