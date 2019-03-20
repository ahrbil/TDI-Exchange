import React, { Fragment } from "react";
import { Query } from "react-apollo";
import { Link } from "@reach/router";

import { QUESTIONS_FEED } from "../../queries";
import { Container, AsideTitle, Wrapper } from "./style";
import { TextButton } from "../../components/button";
import Loader, { Wrapper as LoaderWrapper } from "../../components/loader";

const AsideLatestQuestions = () => (
  <Query
    query={QUESTIONS_FEED}
    variables={{
      first: 6,
      orderBy: "createdAt_DESC"
    }}
  >
    {({ data, loading }) => {
      const { items } =
        !loading && data && data.questionsFeed && data.questionsFeed;
      return (
        <Wrapper>
          <AsideTitle>Latest Questions</AsideTitle>
          {loading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
          {!loading && items && (
            <Fragment>
              {items.map(item => (
                <Container key={item.id}>
                  <Link to={`/questions/${item.id}`}>
                    <p>{item.header}</p>
                  </Link>
                </Container>
              ))}
              <Link to="/">
                <TextButton small>View All</TextButton>
              </Link>
            </Fragment>
          )}
        </Wrapper>
      );
    }}
  </Query>
);

export default AsideLatestQuestions;
