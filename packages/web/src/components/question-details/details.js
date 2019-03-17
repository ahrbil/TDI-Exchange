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
  ActionBarStyle,
  OutLinedBtn
} from "./style";
import { ITEMS_ON_PAGE } from "../../constants";
import QuestionHeader from "./questionHeader";
import { AnswerContentLoader } from "../loader";
import Icon from "../icons";
import EditQuestion from "./edit-answer";
import { DELETE_QUESTION } from "../../queries";
import Modal from "../modal";
import Button, { TextButton } from "../button";
import DropDown, { DropDownItem } from "../drop-down";
import { Text } from "../drop-down/style";
// import { formatError } from "../../utils";

const createdAtDESC = "createdAt_DESC";
const createdAtASC = "createdAt_ASC";

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
  handleOrderBy,
  activeDesc,
  activeAsc,
  loading,
  isEditing,
  setIsEditing
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
                <OutLinedBtn
                  onClick={() => handleOrderBy(createdAtDESC)}
                  activeDesc={activeDesc}
                >
                  <Icon iconName="arrowUp" />
                </OutLinedBtn>
                <OutLinedBtn
                  onClick={() => handleOrderBy(createdAtASC)}
                  activeAsc={activeAsc}
                >
                  <Icon iconName="arrowDown" />
                </OutLinedBtn>
                {currentUser && isOwner && (
                  <Fragment>
                    <DropDown overlay={<Menu />}>
                      <OutLinedBtn>
                        <Icon iconName="gear" />
                      </OutLinedBtn>
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
            {currentUser && <CreateAnswer questionId={question.id} />}
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
  handleOrderBy: PropTypes.func.isRequired,
  activeDesc: PropTypes.bool.isRequired,
  activeAsc: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  setIsEditing: PropTypes.func.isRequired
};

const ModalBtns = styled.div`
  display: flex;
  > button {
    margin-right: 1rem;
  }
`;
