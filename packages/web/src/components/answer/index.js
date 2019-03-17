import React, { Fragment } from "react";
import styled from "styled-components";

import RichRender from "../rich-texte-rendrer";
import QuestionHeader from "../question-details/questionHeader";
import Icon from "../icons";
import DropDown, { DropDownItem } from "../drop-down";
import { Text, DropDownWrapper } from "../drop-down/style";
import { OutLinedBtn } from "../question-details/style";
import CreateAnswer from "../create-answer";

const Answer = ({ answer, questionId, currentUser }) => {
  const [isEdit, setIsEdit] = React.useState(false);
  const toggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const Menu = () => (
    <Fragment>
      <DropDownItem icon="edit" onClick={toggleEdit}>
        <Text>Edit</Text>
      </DropDownItem>
      <DropDownItem icon="delete" className="danger">
        <Text>Delete</Text>
      </DropDownItem>
    </Fragment>
  );
  return (
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
        <DropDown overlay={<Menu />}>
          <OutLinedBtn className="dropIcon">
            <Icon iconName="squareDots" />
          </OutLinedBtn>
        </DropDown>
      )}
    </AnswerStyle>
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
    padding-right: 12px;
  }
  ${OutLinedBtn} {
    border: none;
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
