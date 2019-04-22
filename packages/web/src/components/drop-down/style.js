import styled from "styled-components";

import { SvgWrapper } from "../icons";

export const DropDownWrapper = styled.div`
  position: relative;
`;
export const DropDownContent = styled.ul`
  position: absolute;
  top: 25px;
  right: 0px;
  border: 1px solid #f8f8f8;
  padding: 8px 0px;
  background-color: white;
  box-shadow: 0px 3px 18px 0px #d3d3d9;
  border-radius: 4.71px;
  width: 170px;
  z-index: 100;
  list-style: none;
`;
export const DropDownItemStyle = styled.li`
  padding: 8px 16px;
  transition: all 0.2s ease-in;
  cursor: pointer;
  display: flex;
  &:last-of-type {
    border-bottom: none;
  }
  &:hover {
    background-color: rgb(247, 249, 250);
  }
  ${SvgWrapper} {
    width: 21px;
    margin-right: 1.1rem;
  }
  &.danger {
    color: ${props => props.theme.error.primary};
  }
`;
export const Header = styled.span`
  cursor: pointer;
  display: flex;
  svg {
    fill: ${props =>
      props.active ? props.theme.color.primary : "currentColor"};
  }
`;
export const Text = styled.span`
  font-size: 0.85rem;
  font-weight: 500;
`;
