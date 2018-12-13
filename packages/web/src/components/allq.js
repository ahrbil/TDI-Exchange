import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { ALL_QUESTIONS } from "../queries";

const AllQ = props => (
  <Query query={ALL_QUESTIONS}>
    {({ data, loading }) => {
      if (loading) {
        return <h1>loading</h1>;
      }
      const allQuestions = data && data.allQuestions;
      return (
        <Questions>
          <aside style={{ gridArea: "aside" }}>ASIIIIDE👏👏🍳</aside>
          {allQuestions.map(question => (
            <div key={question.id} className="q">
              <h1 style={{ fontSize: "21px", fontWeight: 700 }}>
                {question.header}
              </h1>
              <p>{question.updatedAt}</p>
              <h4>{question.askedBy.userName}</h4>
              <img src={question.askedBy.avatar} alt="t" />
            </div>
          ))}
        </Questions>
      );
    }}
  </Query>
);

export default AllQ;

const Questions = styled.div`
  border: 1px solid salmon;
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: repeat(auto-fill, minmax(150px, auto));
  grid-template-areas: "q  aside";
  .q {
    color: burlywood;
  }
`;
