import React from "react";
import styled,{css} from "styled-components";

import Icon from "./Icon";

const RichBtnStyle = styled.button`
  box-shadow: 0px 3px 3px rgba(12, 52, 75, 0.1);
  width: 34px;
  height: 34px;
  border: none;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  flex: none;
  align-self: center;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  white-space: nowrap;
  word-break: keep-all;
  line-height: 1;
  position: relative;
  text-align: center;
  background-color: ${props => props.theme.white};
  &:hover {
    background-color: ${props => props.theme.hv_white};
  }
  ${props=>props.isActive && css`
      border: 2px solid #6495ed;
      background-color: ${props => props.theme.hv_white};
  `}
`;
const LabelFile = styled(RichBtnStyle)`
  input {
    visibility: hidden;
  }
  div {
    position: absolute;
  }
`;

const RichBtn = ({
  toggleInlineStyle,
  toggleBlockType,
  iconName,
  inline,
  block,
  style,
  isActive,
}) => (
  <RichBtnStyle
    isActive={isActive}
    onClick={(inline && toggleInlineStyle) || (block && toggleBlockType)}
  >
    <Icon iconName={iconName} style={style}/>
  </RichBtnStyle>
);

export const InputFileBtn = ({ onChange, iconName }) => (
  <LabelFile as="label">
    <input type="file" id="file" onChange={onChange} />
    <Icon iconName={iconName} />
  </LabelFile>
);

export default RichBtn;
