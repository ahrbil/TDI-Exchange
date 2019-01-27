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
    return (
      <Query
        query={INTERNSHIPS_FEED}
        variables={{
          skip: currentPage * ITEMS_ON_PAGE - ITEMS_ON_PAGE,
          orderBy: "createdAt_DESC"
        }}
      >
        {({ data, loading, error }) => (
          <>
            {data && data.internshipsFeed && (
              <InternshipListStyle>
                {data.internshipsFeed.items.map(internship => (
                  <Internship key={internship.id} {...internship} />
                ))}
                <PaginationContainer>
                  <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    pageSize={ITEMS_ON_PAGE}
                    total={data.internshipsFeed.count}
                    onChange={this.handlePaginationChange}
                  />
                </PaginationContainer>
              </InternshipListStyle>
            )}
            {loading && <h1>loading</h1>}
            <Aside>
              <Link to="/post-an-internship">
                <Button secondary>Post An Internship</Button>
              </Link>
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
const PaginationContainer = styled.div`
  align-self: center;
  margin: 2rem 0;
`;
