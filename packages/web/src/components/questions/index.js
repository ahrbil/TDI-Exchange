import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "@reach/router";

import { ALL_QUESTIONS } from "../../queries";
import Question from "../question";
import CustomPagination from "../pagination";
import { ITEMS_ON_PAGE } from "../../constants";
import Aside from "../aside";
import Button from "../button";

class Questions extends React.Component {
  state = {
    currentPage: 1
  };
  handlePaginationChange = currentPage => {
    this.setState({
      currentPage
    });
  };
  render() {
    const { currentPage } = this.state;
    return (
      <Query
        query={ALL_QUESTIONS}
        variables={{
          skip: currentPage * ITEMS_ON_PAGE - ITEMS_ON_PAGE,
          orderBy: "createdAt_DESC"
        }}
      >
        {({ data, loading, error }) => (
          <>
            {data && data.allQuestions && (
              <QuestionsFeed>
                {data.allQuestions.map(question => (
                  <Question key={question.id} question={question} />
                ))}
                <PaginationContainer>
                  <CustomPagination
                    currentPage={currentPage}
                    onChange={this.handlePaginationChange}
                  />
                </PaginationContainer>
              </QuestionsFeed>
            )}
            {loading && <h1>loading</h1>}
            <Aside>
              <Link to="/ask-a-question">
                <Button secondary>Ask A Question</Button>
              </Link>
            </Aside>
          </>
        )}
      </Query>
    );
  }
}

export default Questions;

const QuestionsFeed = styled.div`
  grid-area: main;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-self: stretch;
  align-items: stretch;
`;
const PaginationContainer = styled.div`
  align-self: center;
  margin: 2rem 0;
`;
