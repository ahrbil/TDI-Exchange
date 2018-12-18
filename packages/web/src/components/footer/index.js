import React from "react";
import styled from "styled-components";

const Footer = () => (
  <FooterContainer>
    <div>
      <span>made with ❤ by </span>
      <a
        href="https://www.linkedin.com/in/ahrbil"
        target="_blank"
        rel="noopener noreferrer"
      >
        ahrbil
      </a>
    </div>
  </FooterContainer>
);
const FooterContainer = styled.div`
  width: 100%;
  height: 40px;
  border-top: 2px solid #d9d8d8;
  background-color: ${props => props.theme.hv_white};
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    text-decoration: underline;
    padding: 3px;
  }
`;

export default Footer;
