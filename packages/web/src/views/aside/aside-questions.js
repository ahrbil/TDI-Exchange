import React from "react";
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
    {({ data, loading }) => (
      <Wrapper>
        <AsideTitle>Latest Questions</AsideTitle>
        {loading && (
          <LoaderWrapper>
            <Loader />
          </LoaderWrapper>
        )}
        {!loading && (
          <>
            {data.questionsFeed.items.map(item => (
              <Container key={item.id}>
                <Link to={`/questions/${item.id}`}>
                  <p>{item.header}</p>
                </Link>
              </Container>
            ))}
            <Link to="/">
              <TextButton small>View All</TextButton>
            </Link>
          </>
        )}
      </Wrapper>
    )}
  </Query>
);

export default AsideLatestQuestions;
