import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { QUESTION_WITH_DETAILS } from "../../queries";
import Details from "./details";
import { ITEMS_ON_PAGE } from "../../constants";

const ANSWERS_ON_PAGE = ITEMS_ON_PAGE + 5;
class QuestionWithDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      orderByAnswers: "createdAt_DESC",
      activeDesc: true,
      activeAsc: false
    };
  }
  handlePaginationChange = currentPage => {
    this.setState({
      currentPage
    });
  };
  handleOrderBy = orderByAnswers => {
    this.setState({
      orderByAnswers,
      activeDesc: orderByAnswers === "createdAt_DESC",
      activeAsc: orderByAnswers === "createdAt_ASC"
    });
  };
  render() {
    const { orderByAnswers, currentPage, activeDesc, activeAsc } = this.state;
    const { route } = this.props;
    return (
      <QuestionDetailsContainer>
        <Query
          query={QUESTION_WITH_DETAILS}
          variables={{
            id: route.qid,
            skip: currentPage * ANSWERS_ON_PAGE - ANSWERS_ON_PAGE,
            orderByAnswers
          }}
          fetchPolicy="cache-first"
        >
          {({ data, loading, error }) => {
            if (loading && !data) {
              return <h1>loading</h1>;
            }
            if (data && data.question) {
              return (
                <Details
                  question={data.question}
                  currentPage={currentPage}
                  handlePaginationChange={this.handlePaginationChange}
                  handleOrderBy={this.handleOrderBy}
                  handleOrderByOld={this.handleOrderByOld}
                  activeDesc={activeDesc}
                  activeAsc={activeAsc}
                />
              );
            }
            return <h1>loading</h1>;
          }}
        </Query>
      </QuestionDetailsContainer>
    );
  }
}

const QuestionDetailsContainer = styled.div`
  grid-area: questions;
`;

export default QuestionWithDetails;
