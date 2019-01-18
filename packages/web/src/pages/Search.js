import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import { SearchContext } from "../context/SearchContext";
import { ALL_QUESTIONS } from "../queries";
import Question from "../components/question";
import Button from "../components/button";
import { Link } from "@reach/router";

class Search extends React.Component {
  static contextType = SearchContext;
  state = {
    page: 1
  };
  render() {
    const { query } = this.context;
    return (
      <Query
        query={ALL_QUESTIONS}
        variables={{ where: { header_contains: query } }}
        skip={!query}
      >
        {({ data, loading }) => {
          const allQuestions =
            data && data.allQuestions ? data.allQuestions : [];
          return (
            <div>
              <SearchResultsHeader>
                <h1>Search Results</h1>
                <Link to="/ask-a-question">
                  <Button secondary small>
                    Ask Question
                  </Button>
                </Link>
              </SearchResultsHeader>
              <div>
                {loading && <h1>loading</h1>}
                {allQuestions &&
                  allQuestions.map(question => (
                    <Question key={question.id} question={question} />
                  ))}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Search;

const SearchResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > button {
    width: auto;
  }
  > h1 {
    font-size: 1.2rem;
    font-weight: 500;
  }
`;
