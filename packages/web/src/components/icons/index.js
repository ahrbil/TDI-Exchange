import React from "react";
import styled from "styled-components";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatListNumbered,
  FormatListBulleted,
  QuestionAnswer,
  Close,
  Error,
  Clear,
  Add,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Edit,
  Delete,
  Notifications
} from "styled-icons/material";
import { ImageAlt } from "styled-icons/boxicons-solid";
import { SignOutAlt, Camera, ArrowLeft } from "styled-icons/fa-solid";
import { Facebook2, Google2, Location2 } from "styled-icons/icomoon";
import { Award, Menu } from "styled-icons/boxicons-regular";
import { Search, Gear } from "styled-icons/octicons";
import { GithubSquare, TwitterSquare } from "styled-icons/fa-brands";

import { ReactComponent as CodeBlock } from "../svgs/bcode.svg";
import { ReactComponent as H3 } from "../svgs/h3.svg";
import { ReactComponent as H2 } from "../svgs/h2.svg";
import { ReactComponent as H1 } from "../svgs/h1.svg";
import { ReactComponent as SquareDots } from "../svgs/square-dots.svg";

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
    case "arrowUp":
      return <KeyboardArrowUp />;
    case "arrowDown":
      return <KeyboardArrowDown />;
    case "github":
      return <GithubSquare />;
    case "twitter":
      return <TwitterSquare />;
    case "edit":
      return <Edit />;
    case "delete":
      return <Delete />;
    case "gear":
      return <Gear />;
    case "squareDots":
      return <SquareDots />;
    case "notifications":
      return <Notifications />;
    default:
      break;
  }
};

export const SvgWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;
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
