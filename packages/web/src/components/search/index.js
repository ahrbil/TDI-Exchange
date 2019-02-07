import React from "react";

import { SearchWrapper, SearchInputStyle, ClearBtn } from "./style";
import Icon from "../icons";
import { navigate } from "@reach/router";
import { SearchConsumer } from "../../context/SearchContext";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
    this.searchInput = React.createRef();
  }

  handleFocus = () => {
    if (this.searchInput.current) {
      this.searchInput.current.focus();
    }
  };

  handleChange = (event, updateQueryFn) => {
    const location = window.location.pathname;
    const isInSearch = location.includes("/search/results");

    this.setState(
      {
        query: event.target.value
      },
      () => {
        const { query } = this.state;
        updateQueryFn(query);
        if (query && !isInSearch) {
          navigate(`/search/results`);
          setTimeout(this.handleFocus, 0);
        }
      }
    );
  };

  handleClear = updateQueryFn => {
    this.setState({ query: "" }, () => {
      const { query } = this.state;
      updateQueryFn(query);
    });
  };

  componentDidMount = () => {
    if (this.props.expanded) {
      this.handleFocus();
    }
  };

  render() {
    const { query } = this.state;
    return (
      <SearchConsumer>
        {({ updateQuery }) => (
          <SearchWrapper onClick={this.handleFocus}>
            <Icon iconName="search" className="search-icon" />
            <SearchInputStyle
              ref={this.searchInput}
              placeholder="Search"
              autoComplete="off"
              spellCheck="false"
              onChange={e => this.handleChange(e, updateQuery)}
              value={query}
            />
            {query && (
              <ClearBtn onClick={() => this.handleClear(updateQuery)}>
                <Icon iconName="clear" className="clear-icon" />
              </ClearBtn>
            )}
          </SearchWrapper>
        )}
      </SearchConsumer>
    );
  }
}

export default Search;
