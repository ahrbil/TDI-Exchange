import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { EditorState } from "draft-js";
import { navigate } from "@reach/router";

import RichEditor from "../editor";
import {
  CREATE_ANSWER,
  QUESTION_WITH_DETAILS,
  UPDATE_ANSWER
} from "../../queries";
import Button, { TextButton } from "../button";
import {
  saveEditorStateToRaw,
  isValidEditorContent,
  getEditorStateFromRaw
} from "../../utils";
import { Error } from "../error";

export default class CreateAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      errorMsg: ""
    };
  }

  handleEditorChange = editorState => {
    this.setState({
      editorState,
      errorMsg: ""
    });
  };

  handleClick = createOrUpdateAnswer => {
    const state = this.state.editorState.getCurrentContent();
    const errorMsg = isValidEditorContent(state);
    this.setState({ errorMsg });
    if (!errorMsg) {
      const { questionId, isEdit, answerId, toggleEdit } = this.props;
      const body = saveEditorStateToRaw(state);
      const variables = {
        body,
        ...(isEdit ? { answerId } : { questionId })
      };
      createOrUpdateAnswer({
        variables
      }).then(() => {
        this.setState({ editorState: EditorState.createEmpty() });
        // only toggle edit mode if we updating a question
        isEdit && toggleEdit();
      });
    }
  };

  componentDidMount = () => {
    const { rawContent, isEdit } = this.props;
    if (isEdit) {
      this.setState({
        editorState: getEditorStateFromRaw(rawContent)
      });
    }
  };

  render() {
    const { editorState, errorMsg } = this.state;
    const { questionId, isEdit, toggleEdit } = this.props;
    const mutation = isEdit ? UPDATE_ANSWER : CREATE_ANSWER;
    return (
      <Mutation
        mutation={mutation}
        refetchQueries={[
          { query: QUESTION_WITH_DETAILS, variables: { id: questionId } }
        ]}
      >
        {(createOrUpdateAnswer, { loading, error }) => (
          <CreateAnswerCard>
            {(errorMsg || error) && (
              <Error className="errorContainer" message={errorMsg || error} />
            )}
            <RichEditor
              editorState={editorState}
              onChange={this.handleEditorChange}
              placeholder="Write your answer here..."
              hasError={errorMsg || error}
              // editorRef={editor => (this.editorRef = editor)}
            />
            <BtnsWrapper>
              <Button
                loading={loading || error}
                onClick={() => this.handleClick(createOrUpdateAnswer)}
              >
                {isEdit ? "Save" : "Publish Your Answer"}
              </Button>
              {isEdit && !loading && (
                <TextButton onClick={toggleEdit}>Cancel</TextButton>
              )}
            </BtnsWrapper>
          </CreateAnswerCard>
        )}
      </Mutation>
    );
  }
}

const CreateAnswerCard = styled.div`
  position: relative;
  padding: 16px;
  .errorContainer {
    position: absolute;
    bottom: 55px;
    left: 20px;
  }
`;
const BtnsWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
  > button {
    margin-right: 0.5rem;
`;
