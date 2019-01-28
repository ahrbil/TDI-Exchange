import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import { SearchContext } from "../context/SearchContext";
import { QUESTIONS_FEED } from "../queries";
import Question from "../components/question";
import Button from "../components/button";
import { Link } from "@reach/router";

class QuestionSearch extends React.Component {
  static contextType = SearchContext;
  // TODO pagination for results
  state = {
    page: 1
  };
  render() {
    const { query } = this.context;
    return (
      <Query
        query={QUESTIONS_FEED}
        variables={{ where: { header_contains: query } }}
        skip={!query}
      >
        {({ data, loading }) => {
          const searchResults =
            data && data.questionsFeed && data.questionsFeed.items
              ? data.questionsFeed.items
              : [];
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
              <Content>
                {/* if we don't loading and we dont get any results */}
                {!searchResults.length && !loading && <p>nothing was found</p>}
                {searchResults &&
                  searchResults.map(question => (
                    <Question key={question.id} question={question} />
                  ))}
                {loading && <h1>loading</h1>}
              </Content>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default QuestionSearch;

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

const Content = styled.div`
  margin-top: 1rem;
`;
