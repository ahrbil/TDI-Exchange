import React from "react";
import debounce from "lodash.debounce";

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

  handleChange = debounce((event, updateQueryFn) => {
    const location = window.location.pathname;
    const isInSearch = location.includes("/search/results");
    const query = event.target.value;
    this.setState({ query });
    updateQueryFn(query);
    if (query && !isInSearch) {
      navigate(`/search/results`);
      this.clearTimeOutId = setTimeout(this.handleFocus, 0);
    }
  }, 400);

  handleClear = updateQueryFn => {
    this.searchInput.current.value = "";
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

  componentWillUnmount = () => {
    clearTimeout(this.clearTimeOutId);
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
              onChange={e => {
                e.persist();
                this.handleChange(e, updateQuery);
              }}
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
