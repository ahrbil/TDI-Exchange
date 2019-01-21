import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import { Link } from "@reach/router";
import Internship from "../internship";
import { ALL_INTERNSHIPS } from "../../queries";
import Aside from "../aside";
import Button from "../button";

const InternshipList = () => (
  <Query query={ALL_INTERNSHIPS}>
    {({ data, loading, error }) => (
      <>
        {data && data.allInternships && (
          <InternshipListStyle>
            {data.allInternships.map(internship => (
              <Internship key={internship.id} {...internship} />
            ))}
          </InternshipListStyle>
        )}
        {loading && <h1>loading</h1>}
        <Aside>
          <Link to="/post-internship">
            <Button secondary>Post An Internship</Button>
          </Link>
        </Aside>
      </>
    )}
  </Query>
);

export default InternshipList;

const InternshipListStyle = styled.div`
  grid-area: main;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-self: stretch;
  align-items: stretch;
`;
