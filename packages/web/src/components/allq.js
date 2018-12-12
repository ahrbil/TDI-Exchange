import React from "react";
import { Query } from "react-apollo";
import { ALL_QUESTIONS } from "../queries";

const AllQ = props => (
  <Query query={ALL_QUESTIONS}>
    {({ data, loading }) => {
      if (loading) {
        return <h1>loading</h1>;
      }
      const { allQuestions } = data;
      return (
        <div>
          {allQuestions.map(question => (
            <div key={question.id}>
              <h3>{question.header}</h3>
              <p>{question.updatedAt}</p>
              <h5>{question.askedBy.userName}</h5>
              <img src={question.askedBy.avatar} alt="t" />
            </div>
          ))}
        </div>
      );
    }}
  </Query>
);

export default AllQ;
