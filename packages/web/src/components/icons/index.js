import React from "react";
import styled from "styled-components";

import { FormatBold } from "styled-icons/material/FormatBold";
import { FormatItalic } from "styled-icons/material/FormatItalic";
import { FormatUnderlined } from "styled-icons/material/FormatUnderlined";
import { Code } from "styled-icons/material/Code";
import { FormatListNumbered } from "styled-icons/material/FormatListNumbered";
import { FormatListBulleted } from "styled-icons/material/FormatListBulleted";
import { ImageAlt } from "styled-icons/boxicons-solid/ImageAlt";
import { SignOutAlt } from "styled-icons/fa-solid/SignOutAlt";
import { QuestionAnswer } from "styled-icons/material/QuestionAnswer";
import { Facebook2 } from "styled-icons/icomoon/Facebook2";
import { Google2 } from "styled-icons/icomoon/Google2";
import { Close } from "styled-icons/material/Close";
import { Error } from "styled-icons/material/Error";
import { Award } from "styled-icons/boxicons-regular/Award";
import { Search } from "styled-icons/octicons/Search";
import { Clear } from "styled-icons/material/Clear";
import { Location2 } from "styled-icons/icomoon/Location2";
import { Camera } from "styled-icons/fa-solid/Camera";
import { ArrowLeft } from "styled-icons/fa-solid/ArrowLeft";
import { Menu } from "styled-icons/boxicons-regular/Menu";
import { Add } from "styled-icons/material/Add";

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
    case "fb":
      return <Facebook2 />;
    case "google":
      return <Google2 />;
    case "close":
      return <Close />;
    case "error":
      return <Error />;
    case "award":
      return <Award />;
    case "search":
      return <Search />;
    case "clear":
      return <Clear />;
    case "location":
      return <Location2 />;
    case "camera":
      return <Camera />;
    case "arrowLeft":
      return <ArrowLeft />;
    case "menu":
      return <Menu />;
    case "add":
      return <Add />;
    default:
      break;
  }
};

export const SvgWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  min-height: 21px;
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
