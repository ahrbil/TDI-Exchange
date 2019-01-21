import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";

import Internship from "../internship";
import { ALL_INTERNSHIPS } from "../../queries";

const InternshipList = () => (
  <Query query={ALL_INTERNSHIPS}>
    {({ data, loading, error }) => {
      if (loading) {
        return <h1>loading</h1>;
      }
      if (data && data.allInternships) {
        const { allInternships } = data;
        return (
          <InternshipListStyle>
            {allInternships.map(internship => (
              <Internship key={internship.id} {...internship} />
            ))}
          </InternshipListStyle>
        );
      }
      return null;
    }}
  </Query>
);

export default InternshipList;

const InternshipListStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin: 16px;
`;
