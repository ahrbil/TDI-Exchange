import React from "react";
import styled from "styled-components";
import { SearchWrapper } from "../style";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.f = React.createRef();
    this.handleFocus = this.handleFocus.bind(this);
  }

  handleFocus() {
    this.f.current.focus();
  }

  render() {
    return (
      <SearchWrapper ref={this.f}>
        <SearchStyle placeholder="Search" onFocus={this.handleFocus} />
      </SearchWrapper>
    );
  }
}

export default Search;

const SearchStyle = styled.input`
  font-size: 21px;
  background-color: #f8f8f8;
  width: 100%;
  padding: 6px;
  border-radius: 4.71px;
  border: 1px solid transparent;
  &:hover {
    background-color: #fcfcfc;
    border-color: #dbdbdb;
    transition: background 200ms ease-out;
    transition: border 200ms ease-in;
  }
  &:focus {
    background-color: #fcfcfc;
    border-color: #dbdbdb;
  }
`;
