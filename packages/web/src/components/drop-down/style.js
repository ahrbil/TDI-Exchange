import styled from "styled-components";

import { SvgWrapper } from "../icons";

export const DropDownWrapper = styled.div`
  position: relative;
`;
export const DropDownContent = styled.ul`
  position: absolute;
  right: 0;
  border: 1px solid #f8f8f8;
  padding: 8px 0px;
  background-color: white;
  box-shadow: 0px 0px 18px 0px #d7d4d4;
  border-radius: 4.71px;
  width: 170px;
  z-index: 100;
  list-style: none;
`;
export const DropDownItemStyle = styled.li`
  padding: 8px 16px;
  margin: 0.1rem 0rem;
  border-bottom: 1px solid #e6e4e4;
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
    margin-right: 0.6rem;
  }
  &.danger {
    color: ${props => props.theme.error.primary};
  }
`;
export const Header = styled.span`
  svg {
    fill: ${props =>
      props.active ? props.theme.color.primary : "currentColor"};
  }
`;
export const Text = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
`;
