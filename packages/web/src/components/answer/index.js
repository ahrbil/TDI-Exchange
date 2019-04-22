import React, { Fragment } from "react";
import styled from "styled-components";

import { Mutation } from "react-apollo";
import RichRender from "../rich-texte-rendrer";
import QuestionHeader from "../question-details/questionHeader";
import Icon from "../icons";
import DropDown, { DropDownItem } from "../drop-down";
import { Text, DropDownWrapper } from "../drop-down/style";
import CreateAnswer from "../create-answer";
import { DELETE_ANSWER, QUESTION_WITH_DETAILS } from "../../queries";
import Button, { TextButton, IconButton } from "../button";
import Modal from "../modal";

const Answer = ({ answer, questionId, currentUser, skip, orderByAnswers }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const [modalOpen, setModalOpen] = React.useState(false);
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const Menu = ({ openModal }) => (
    <Fragment>
      <DropDownItem icon="edit" onClick={toggleEdit}>
        <Text>Edit</Text>
      </DropDownItem>
      <DropDownItem
        icon="delete"
        className="danger"
        onClick={() => openModal(true)}
      >
        <Text>Delete</Text>
      </DropDownItem>
    </Fragment>
  );
  return (
    <Mutation
      mutation={DELETE_ANSWER}
      variables={{ answerId: answer.id }}
      refetchQueries={[
        {
          query: QUESTION_WITH_DETAILS,
          variables: {
            id: questionId,
            skip,
            orderByAnswers
          }
        }
      ]}
      onCompleted={() => setModalOpen(false)}
    >
      {(deleteAnswer, { loading }) => (
        <AnswerStyle>
          <QuestionHeader
            user={answer.answeredBy}
            createdAt={answer.createdAt}
            forAnswer
          />
          {isEdit ? (
            <CreateAnswer
              answerId={answer.id}
              questionId={questionId}
              isEdit={isEdit}
              rawContent={answer.body}
              toggleEdit={toggleEdit}
            />
          ) : (
            <RichRender body={answer.body} />
          )}

          {currentUser && answer.isOwner && (
            <Fragment>
              <DropDown overlay={<Menu openModal={setModalOpen} />}>
                <IconButton className="dropIcon">
                  <Icon iconName="squareDots" />
                </IconButton>
              </DropDown>
              <Modal
                title="Are you sure you want to delete this answer?"
                isOpen={modalOpen}
                closeModal={() => !loading && setModalOpen(false)}
              >
                <ModalBtns>
                  <Button
                    onClick={async () => {
                      try {
                        await deleteAnswer();
                        // close the modal after deleting tha answer
                        setModalOpen(false);
                      } catch (error) {
                        // console.log(error);
                      }
                    }}
                    loading={loading}
                  >
                    Delete
                  </Button>
                  {!loading && (
                    <TextButton onClick={() => setModalOpen(false)}>
                      Cancel
                    </TextButton>
                  )}
                </ModalBtns>
              </Modal>
            </Fragment>
          )}
        </AnswerStyle>
      )}
    </Mutation>
  );
};

export default Answer;

const AnswerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  ${DropDownWrapper} {
    display: flex;
    justify-content: flex-end;
    margin-right: 16px;
  }
  &:hover,
  &:active,
  &:focus {
    background-color: #f8f8f8;
  }
  .markdown {
    padding-top: 0;
  }
`;

const ModalBtns = styled.div`
  display: flex;
  > button {
    margin-right: 1rem;
  }
`;
