import styled from "styled-components";
import { SvgWrapper } from "../icons";

export const SearchStyle = styled.input`
  font-size: 1rem;
  font-weight: 500;
  background: transparent;
  outline: none;
  border: none;
  &:focus {
    &::placeholder {
      color: inherit;
    }
  }
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  background-color: #f7f7f7;
  width: 100%;
  height: 100%;
  height: 2.2rem;
  padding: 0 40px;
  overflow: hidden;
  border-radius: 3.14px;
  cursor: text;
  white-space: nowrap;
  color: #a2a9b0;
  ${SvgWrapper} {
    width: 19px;
    height: 100%;
    position: absolute;
    left: 8px;
    transition: all 0.2s ease-in;
  }
  &:focus-within {
    color: inherit;
  }
`;
