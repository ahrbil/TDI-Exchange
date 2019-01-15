import React from "react";
import { SearchWrapper, SearchStyle } from "./style";
import Icon from "../icons";

class Search extends React.Component {
  state = {
    query: ""
  };
  searchInput = React.createRef();

  handleFocus = () => {
    this.searchInput.current.focus();
  };

  render() {
    return (
      <SearchWrapper onClick={this.handleFocus}>
        <Icon iconName="search" />
        <SearchStyle
          ref={this.searchInput}
          placeholder="Search"
          autoComplete="off"
          spellCheck="false"
        />
      </SearchWrapper>
    );
  }
}

export default Search;
