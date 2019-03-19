import React, { Fragment } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link, navigate } from "@reach/router";

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

const Questions = props => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalQuestions, setTotalQuestions] = React.useState(null);
  const totalSkip = currentPage * ITEMS_ON_PAGE - ITEMS_ON_PAGE;

  const handlePaginationChange = index => {
    setCurrentPage(index);
    navigate(`/page/${index}`);
  };

  const onQueryCompleted = (items, count) => {
    const hasItems = items && items.length > 0;
    if (!hasItems) {
      handlePaginationChange(1);
      return;
    }
    if (count !== totalQuestions) {
      setTotalQuestions(count);
    }
  };

  // if props.index changes useEffect will run this function
  React.useEffect(() => {
    const { index } = props;
    const parsedIndex = parseInt(index, 10);
    if (Number.isInteger(parsedIndex) && parsedIndex >= 1) {
      handlePaginationChange(parsedIndex);
      return;
    }
    // if index is undefined od a string fallback to first page
    if (typeof parsedIndex === "undefined" || typeof index === "string") {
      setCurrentPage(1);
      navigate(`/`);
    }
  }, [props.index]);

  return (
    <Query
      query={QUESTIONS_FEED}
      variables={{
        skip: totalSkip,
        orderBy: "createdAt_DESC"
      }}
      onCompleted={({ questionsFeed: { items, count } }) =>
        onQueryCompleted(items, count)
      }
    >
      {({ data, loading, error }) => {
        const { items, count } =
          !loading && data && data.questionsFeed && data.questionsFeed;
        return (
          <Fragment>
            {items && !loading && (
              <QuestionsFeed>
                {items.map(question => (
                  <Question key={question.id} question={question} />
                ))}
                {count && count > ITEMS_ON_PAGE && (
                  <PaginationCard>
                    <PaginationContainer>
                      <Pagination
                        defaultCurrent={1}
                        current={currentPage}
                        pageSize={1}
                        total={count}
                        onChange={handlePaginationChange}
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
          </Fragment>
        );
      }}
    </Query>
  );
};

export default Questions;

const QuestionsFeed = styled.div`
  grid-area: main;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-self: stretch;
  align-items: stretch;
`;
