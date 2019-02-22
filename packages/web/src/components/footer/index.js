import React from "react";
import { Link } from "@reach/router";

import Icon from "../icons";
import Logo from "../logo";
import {
  FooterContainer,
  SocialIcons,
  FooterGrid,
  BrandArea,
  PrivacyArea,
  CreatorArea
} from "./style";

const Footer = () => (
  <FooterContainer>
    <FooterGrid>
      <BrandArea>
        <Logo />
        <SocialIcons>
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
        </SocialIcons>
      </BrandArea>
      <PrivacyArea>
        <Link to="/privacy">
          <span>Privacy Policy</span>
        </Link>
        <Link to="/terms">
          <span>Terms of Service</span>
        </Link>
      </PrivacyArea>
      <CreatorArea>
        <span>made with ❤ by </span>
        <a
          href="https://www.linkedin.com/in/ahrbil"
          target="_blank"
          rel="noopener noreferrer"
        >
          ahrbil
        </a>
      </CreatorArea>
    </FooterGrid>
  </FooterContainer>
);

export default Footer;
