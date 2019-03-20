import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { navigate } from "@reach/router";
import { adopt } from "react-adopt";

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
  ActionBarStyle
} from "./style";
import { ITEMS_ON_PAGE } from "../../constants";
import QuestionHeader from "./questionHeader";
import { AnswerContentLoader } from "../loader";
import Icon from "../icons";
import EditQuestion from "./edit-answer";
import { DELETE_QUESTION } from "../../queries";
import Modal from "../modal";
import Button, { TextButton, IconButton } from "../button";
import DropDown, { DropDownItem } from "../drop-down";
import { Text } from "../drop-down/style";
// import { formatError } from "../../utils";

const QuestionMutation = ({ render }) => (
  <Mutation mutation={DELETE_QUESTION}>
    {(deleteQuestion, result) => render({ deleteQuestion, result })}
  </Mutation>
);

const CurrentUser = ({ render }) => (
  <AuthConsumer>{({ currentUser }) => render({ currentUser })}</AuthConsumer>
);

const Composed = adopt({
  mutation: QuestionMutation,
  authUser: CurrentUser
});

const Details = ({
  question,
  currentPage,
  handlePaginationChange,
  loading,
  isEditing,
  setIsEditing,
  skip,
  orderByAnswers
}) => {
  const { isOwner } = question;
  const [modalOpen, setModalOpen] = React.useState(false);

  const deleteQuestionAndRedirect = async deleteQuestion => {
    try {
      await deleteQuestion({ variables: { questionId: question.id } });
      await navigate("/");
    } catch (err) {
      if (err.graphQLErrors) {
        // const error = formatError(err);
        // TODO display an alert to user about this error
      }
    }
  };

  const Menu = () => (
    <Fragment>
      <DropDownItem onClick={() => setIsEditing(true)} icon="edit">
        <Text>Edit</Text>
      </DropDownItem>
      <DropDownItem
        className="danger"
        onClick={() => setModalOpen(true)}
        icon="delete"
      >
        <Text>Delete</Text>
      </DropDownItem>
    </Fragment>
  );

  return (
    <Composed>
      {({
        mutation: { deleteQuestion, result },
        authUser: { currentUser }
      }) => {
        const deleting = result.loading;
        return isEditing ? (
          <EditQuestion
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            header={question.header}
            body={question.body}
            questionId={question.id}
          />
        ) : (
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
              <h3>{`${question.totalAnswers} Answers`}</h3>
              <div>
                {currentUser && isOwner && (
                  <Fragment>
                    <DropDown overlay={<Menu />}>
                      <IconButton>
                        <Icon iconName="gear" />
                      </IconButton>
                    </DropDown>
                    <Modal
                      title="Are you sure you want to delete this question?"
                      isOpen={modalOpen}
                      closeModal={() => !deleting && setModalOpen(false)}
                    >
                      <ModalBtns>
                        <Button
                          onClick={() =>
                            deleteQuestionAndRedirect(deleteQuestion)
                          }
                          loading={deleting}
                        >
                          Delete
                        </Button>
                        {!deleting && (
                          <TextButton onClick={() => setModalOpen(false)}>
                            Cancel
                          </TextButton>
                        )}
                      </ModalBtns>
                    </Modal>
                  </Fragment>
                )}
              </div>
            </ActionBarStyle>
            {/* answer section */}
            {loading ? (
              <AnswerContentLoader />
            ) : (
              <AnswersSection>
                {question.answers.map(answer => (
                  <Answer
                    key={answer.id}
                    answer={answer}
                    questionId={question.id}
                    currentUser={currentUser}
                    skip={skip}
                    orderByAnswers={orderByAnswers}
                  />
                ))}
              </AnswersSection>
            )}
            {/* pagination */}
            {question.totalAnswers > ITEMS_ON_PAGE && !loading && (
              <Pagination
                defaultCurrent={1}
                total={question.totalAnswers}
                current={currentPage}
                pageSize={ITEMS_ON_PAGE}
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
            {currentUser && (
              <CreateAnswer
                questionId={question.id}
                skip={skip}
                orderByAnswers={orderByAnswers}
              />
            )}
            {!currentUser && (
              <ActionBarStyle>
                <LogInModal />
              </ActionBarStyle>
            )}
          </DetailsContainerStyle>
        );
      }}
    </Composed>
  );
};

export default Details;
Details.propTypes = {
  question: PropTypes.shape({
    totalAnswers: PropTypes.number,
    body: PropTypes.string,
    header: PropTypes.string,
    createdAt: PropTypes.string,
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        answer: PropTypes.string
      })
    )
  }).isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePaginationChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired,
  skip: PropTypes.number.isRequired
};

const ModalBtns = styled.div`
  display: flex;
  > button {
    margin-right: 1rem;
  }
`;
