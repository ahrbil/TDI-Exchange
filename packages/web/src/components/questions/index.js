import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { ALL_QUESTIONS } from "../../queries";
import Question from "../question";
import CustomPagination from "../pagination";
import { ITEMS_ON_PAGE } from "../../constants";

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
        {({ data, loading, error }) => {
          if (loading) {
            return <h1>loading</h1>;
          }
          if (data && data.allQuestions) {
            const { allQuestions } = data;
            return (
              <QuestionsFeed>
                {allQuestions.map(question => (
                  <Question key={question.id} question={question} />
                ))}
                <PaginationContainer>
                  <CustomPagination
                    currentPage={currentPage}
                    onChange={this.handlePaginationChange}
                  />
                </PaginationContainer>
              </QuestionsFeed>
            );
          }
          return null;
        }}
      </Query>
    );
  }
}

export default Questions;

const QuestionsFeed = styled.div`
  grid-area: questions;
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
