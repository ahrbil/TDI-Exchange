import React from "react";
import styled from "styled-components";

import { FormatBold } from "styled-icons/material/FormatBold";
import { FormatItalic } from "styled-icons/material/FormatItalic";
import { FormatUnderlined } from "styled-icons/material/FormatUnderlined";
import { Code } from "styled-icons/material/Code";
import { FormatListNumbered } from "styled-icons/material/FormatListNumbered";
import { FormatListBulleted } from "styled-icons/material/FormatListBulleted";
import { ImageAlt } from "styled-icons/boxicons-regular/ImageAlt";
import { SignOutAlt } from "styled-icons/fa-solid/SignOutAlt";
import { QuestionAnswer } from "styled-icons/material/QuestionAnswer";

import { ReactComponent as CodeBlock } from "../svgs/bcode.svg";
import { ReactComponent as H3 } from "../svgs/h3.svg";
import { ReactComponent as H2 } from "../svgs/h2.svg";
import { ReactComponent as H1 } from "../svgs/h1.svg";

const Glyph = ({ iconName }) => {
  switch (iconName) {
    case "b":
      return <FormatBold />;
    case "i":
      return <FormatItalic />;
    case "u":
      return <FormatUnderlined />;
    case "c":
      return <Code />;
    case "ol":
      return <FormatListNumbered />;
    case "ul":
      return <FormatListBulleted />;
    case "code-block":
      return <CodeBlock />;
    case "h1":
      return <H1 />;
    case "h2":
      return <H2 />;
    case "h3":
      return <H3 />;
    case "image":
      return <ImageAlt />;
    case "logout":
      return <SignOutAlt />;
    case "answers":
      return <QuestionAnswer />;
    default:
      break;
  }
};

const SvgWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 21px;
  color: inherit;
  svg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    color: inherit;
    fill: currentColor;
  }
`;

const Icon = ({ iconName, ...rest }) => (
  <SvgWrapper {...rest}>
    <Glyph iconName={iconName} />
  </SvgWrapper>
);
export default Icon;
