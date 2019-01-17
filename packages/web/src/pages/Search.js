import React from "react";
import styled from "styled-components";

import { SearchConsumer } from "../context/SearchContext";

const Search = () => (
  <SearchConsumer>
    {({ query }) => (
      <div>
        <h1>
          search results 🔍:
          {`${query}`}
        </h1>
      </div>
    )}
  </SearchConsumer>
);

export default Search;
