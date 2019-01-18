import React from "react";

export const SearchContext = React.createContext();

export class SearchProvider extends React.Component {
  state = {
    query: ""
  };
  updateQuery = query => {
    this.setState({
      query
    });
  };
  render() {
    const { query } = this.state;
    return (
      <SearchContext.Provider
        value={{
          query,
          updateQuery: this.updateQuery
        }}
      >
        {this.props.children}
      </SearchContext.Provider>
    );
  }
}

export const SearchConsumer = SearchContext.Consumer;
