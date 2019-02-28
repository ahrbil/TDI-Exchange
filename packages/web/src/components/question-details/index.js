import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "@reach/router";

import { QUESTION_WITH_DETAILS } from "../../queries";
import Details from "./details";
import { ANSWERS_ON_PAGE } from "../../constants";
import Aside from "../aside";
import { AsideItem } from "../aside/style";
import Button from "../button";

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
      <Query
        query={QUESTION_WITH_DETAILS}
        variables={{
          id: route.qid,
          skip: currentPage * ANSWERS_ON_PAGE - ANSWERS_ON_PAGE,
          orderByAnswers
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, error }) => (
          <>
            {data && data.question && (
              <QuestionDetailsContainer>
                <Details
                  question={data.question}
                  currentPage={currentPage}
                  handlePaginationChange={this.handlePaginationChange}
                  handleOrderBy={this.handleOrderBy}
                  handleOrderByOld={this.handleOrderByOld}
                  activeDesc={activeDesc}
                  activeAsc={activeAsc}
                  loading={loading}
                />
              </QuestionDetailsContainer>
            )}
            <Aside>
              <AsideItem>
                <Link to="/ask-a-question">
                  <Button secondary>Ask A Question</Button>
                </Link>
              </AsideItem>
            </Aside>
          </>
        )}
      </Query>
    );
  }
}

const QuestionDetailsContainer = styled.div`
  grid-area: main;
`;

export default QuestionWithDetails;
