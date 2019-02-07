import styled from "styled-components";
import { SvgWrapper } from "../icons";

export const SearchInputStyle = styled.input`
  font-size: 1rem;
  font-weight: 500;
  width: 100%;
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
  align-items: center;
  background-color: #f7f7f7;
  width: 100%;
  height: 2.2rem;
  max-height: 100%;
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
    transition: all 0.2s ease-in;
  }
  &:focus-within {
    color: inherit;
  }
  .search-icon {
    left: 8px;
  }
  .clear-icon {
    width: 20px;
  }
`;
export const ClearBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 8px;
  color: #767676;
  background-color: lightgrey;
  width: 25px;
  height: 25px;
  border-radius: 100%;
  cursor: pointer;
`;
