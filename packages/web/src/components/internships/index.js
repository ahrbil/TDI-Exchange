import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import { Link } from "@reach/router";
import Internship from "../internship";
import { INTERNSHIPS_FEED } from "../../queries";
import Aside from "../aside";
import Button from "../button";
import Pagination from "../pagination";
import { ITEMS_ON_PAGE } from "../../constants";
import { AsideItem } from "../aside/style";
import { PaginationCard, PaginationContainer } from "../pagination/style";
import Loader, { Wrapper } from "../loader";

class InternshipList extends React.Component {
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
    const where = this.props.tagParam
      ? { tags_some: { name: this.props.tagParam } }
      : {};
    return (
      <Query
        query={INTERNSHIPS_FEED}
        variables={{
          skip: currentPage * ITEMS_ON_PAGE - ITEMS_ON_PAGE,
          orderBy: "createdAt_DESC",
          where
        }}
        fetchPolicy="cache-and-network"
      >
        {({ data, loading, error }) => (
          <>
            {data && data.internshipsFeed && !loading && (
              <InternshipListStyle>
                {data.internshipsFeed.items.map(internship => (
                  <Internship key={internship.id} {...internship} />
                ))}
                {data.internshipsFeed.count > ITEMS_ON_PAGE && (
                  <PaginationCard>
                    <PaginationContainer>
                      <Pagination
                        defaultCurrent={1}
                        current={currentPage}
                        pageSize={ITEMS_ON_PAGE}
                        total={data.internshipsFeed.count}
                        onChange={this.handlePaginationChange}
                      />
                    </PaginationContainer>
                  </PaginationCard>
                )}
              </InternshipListStyle>
            )}
            {loading && (
              <Wrapper>
                <Loader />
              </Wrapper>
            )}
            <Aside>
              <AsideItem>
                <Link to="/post-an-internship">
                  <Button secondary>Post An Internship</Button>
                </Link>
              </AsideItem>
            </Aside>
          </>
        )}
      </Query>
    );
  }
}

export default InternshipList;

const InternshipListStyle = styled.div`
  grid-area: main;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-self: stretch;
  align-items: stretch;
`;
