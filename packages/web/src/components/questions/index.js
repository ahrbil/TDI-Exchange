import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "@reach/router";

import { QUESTIONS_FEED } from "../../queries";
import Question from "../question";
import Pagination from "../pagination";
import { ITEMS_ON_PAGE } from "../../constants";
import Aside from "../aside";
import Button from "../button";
import { AsideItem } from "../aside/style";
import { PaginationCard, PaginationContainer } from "../pagination/style";
import Loader, { Wrapper } from "../loader";
import AsideLatestInternships from "../../views/aside/aside-internships";

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
        query={QUESTIONS_FEED}
        variables={{
          skip: currentPage * ITEMS_ON_PAGE - ITEMS_ON_PAGE,
          orderBy: "createdAt_DESC"
        }}
      >
        {({ data, loading, error }) => (
          <>
            {data && data.questionsFeed && !loading && (
              <QuestionsFeed>
                {data.questionsFeed.items.map(question => (
                  <Question key={question.id} question={question} />
                ))}
                {data.questionsFeed.count > ITEMS_ON_PAGE && (
                  <PaginationCard>
                    <PaginationContainer>
                      <Pagination
                        defaultCurrent={1}
                        current={currentPage}
                        pageSize={ITEMS_ON_PAGE}
                        total={data.questionsFeed.count}
                        onChange={this.handlePaginationChange}
                      />
                    </PaginationContainer>
                  </PaginationCard>
                )}
              </QuestionsFeed>
            )}
            {loading && (
              <Wrapper>
                <Loader />
              </Wrapper>
            )}
            <Aside>
              <AsideItem>
                <Link to="/ask-a-question">
                  <Button secondary>Ask A Question</Button>
                </Link>
              </AsideItem>
              <AsideItem>
                <AsideLatestInternships />
              </AsideItem>
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
