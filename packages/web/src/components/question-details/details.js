import React from "react";

import { QuestionBody } from "../question/style";
import Answer from "../answer";
import CreateAnswer from "../create-answer";
import { AuthConsumer } from "../../context/AuthContext";
import RichRender from "../rich-texte-rendrer";
import LogInModal from "../login-as-modal";
import Pagination from "../pagination";
import {
  DetailsContainerStyle,
  QuestionDetails,
  AnswersSection,
  ActionBarStyle,
  OutLinedBtn
} from "./style";
import { ITEMS_ON_PAGE } from "../../constants";
import QuestionHeader from "./questionHeader";
import Loader, { Wrapper } from "../loader";

const createdAt_DESC = "createdAt_DESC";
const createdAt_ASC = "createdAt_ASC";

const Details = ({
  question,
  currentPage,
  handlePaginationChange,
  handleOrderBy,
  activeDesc,
  activeAsc,
  loading
}) => (
  <AuthConsumer>
    {({ currentUser }) => (
      <DetailsContainerStyle>
        {/* question header style */}
        <QuestionHeader
          user={question.askedBy}
          createdAt={question.createdAt}
        />
        {/* question header */}
        <QuestionBody>
          <h1>{question.header}</h1>
        </QuestionBody>
        {/* question body if it is exists */}
        {question.body && (
          <QuestionDetails>
            <RichRender body={question.body} />
          </QuestionDetails>
        )}
        {/* total answer a question have */}
        <ActionBarStyle>
          <span>{`${question.totalAnswers} Answers`}</span>
          <div>
            <OutLinedBtn
              onClick={() => handleOrderBy(createdAt_DESC)}
              activeDesc={activeDesc}
            >
              Newest
            </OutLinedBtn>
            <OutLinedBtn
              onClick={() => handleOrderBy(createdAt_ASC)}
              activeAsc={activeAsc}
            >
              Oldest
            </OutLinedBtn>
          </div>
        </ActionBarStyle>
        {/* answer section */}
        {loading ? (
          <Wrapper>
            <Loader />
          </Wrapper>
        ) : (
          <AnswersSection>
            {question.answers.map(answer => (
              <Answer key={answer.id} answer={answer} />
            ))}
          </AnswersSection>
        )}
        {/* pagination */}
        {question.totalAnswers > ITEMS_ON_PAGE && !loading && (
          <Pagination
            defaultCurrent={1}
            total={question.totalAnswers}
            current={currentPage}
            pageSize={ITEMS_ON_PAGE + 5}
            onChange={handlePaginationChange}
            style={{ alignSelf: "center", margin: "2rem 0 0.5rem 0" }}
          />
        )}
        {currentUser && (
          <ActionBarStyle>
            <span>Contribute to this question</span>
          </ActionBarStyle>
        )}
        {/* create answer input */}
        {currentUser && <CreateAnswer questionId={question.id} />}
        {!currentUser && (
          <ActionBarStyle>
            <LogInModal />
          </ActionBarStyle>
        )}
      </DetailsContainerStyle>
    )}
  </AuthConsumer>
);

export default Details;
