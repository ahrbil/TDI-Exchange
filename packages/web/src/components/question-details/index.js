import React from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { Link } from "@reach/router";

import { QUESTION_WITH_DETAILS } from "../../queries";
import Details from "./details";
import { ANSWERS_ON_PAGE } from "../../constants";
import Aside from "../aside";
import { AsideItem } from "../aside/style";
import Button from "../button";
import Loader, { Wrapper as LoaderWrapper } from "../loader";

const QuestionWithDetails = ({ route }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [orderByAnswers, setOrderByAnswers] = React.useState("createdAt_DESC");
  const [activeDesc, setActiveDesc] = React.useState(true);
  const [activeAsc, setActiveAsc] = React.useState(false);

  const handlePaginationChange = currentPg => {
    setCurrentPage(currentPg);
  };

  const handleOrderBy = orderAnswers => {
    setOrderByAnswers(orderAnswers);
    setActiveDesc(orderAnswers === "createdAt_DESC");
    setActiveAsc(orderAnswers === "createdAt_ASC");
  };

  return (
    <Query
      query={QUESTION_WITH_DETAILS}
      variables={{
        id: route.qid,
        skip: currentPage * ANSWERS_ON_PAGE - ANSWERS_ON_PAGE,
        orderByAnswers
      }}
    >
      {({ data, loading, error }) => (
        <>
          {loading && (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          )}
          {data && data.question && (
            <QuestionDetailsContainer>
              <Details
                question={data.question}
                currentPage={currentPage}
                handlePaginationChange={handlePaginationChange}
                handleOrderBy={handleOrderBy}
                activeDesc={activeDesc}
                activeAsc={activeAsc}
                loading={loading}
                isEditing={isEditing}
                setIsEditing={setIsEditing}
              />
            </QuestionDetailsContainer>
          )}
          {!isEditing && (
            <Aside>
              <AsideItem>
                <Link to="/ask-a-question">
                  <Button secondary>Ask A Question</Button>
                </Link>
              </AsideItem>
            </Aside>
          )}
        </>
      )}
    </Query>
  );
};

const QuestionDetailsContainer = styled.div`
  grid-area: main;
`;

export default QuestionWithDetails;
