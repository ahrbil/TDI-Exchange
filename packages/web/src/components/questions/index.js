import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { ALL_QUESTIONS } from "../../queries";
import Question from "../question";
import CustomPagination from "../pagination";

class Questions extends React.Component {
  state = {
    currentPage: 1,
    pageSize: 15
  };
  handlePaginationChange = (page, pageSize) => {
    this.setState({
      currentPage: page,
      pageSize
    });
  };
  render() {
    return (
      <Query query={ALL_QUESTIONS}>
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
                  <CustomPagination onChange={this.handlePaginationChange} />
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
