import React from "react";
import styled from "styled-components";
import { EditorState } from "draft-js";
import { Mutation } from "react-apollo";

import RichEditor from "../editor";
import Button from "../button";
import { CREATE_QUESTION } from "../../queries";
import { saveEditorStateToRaw } from "../../utils";

class CreateQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      header: ""
    };
  }

  handleEditorChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleTextInputChange = e => {
    const header = e.target.value;
    this.setState({
      header
    });
  };

  handleClick = createQuestion => {
    const state = this.state.editorState.getCurrentContent();
    const body = saveEditorStateToRaw(state);
    const { header } = this.state;
    createQuestion({
      variables: {
        header,
        body
      }
    }).then(() => this.setState({ editorState: EditorState.createEmpty() }));
  };

  render() {
    return (
      <Mutation mutation={CREATE_QUESTION}>
        {(createQuestion, { loading, error }) => (
          <div>
            <QuestionInput
              placeholder="Your question..."
              onChange={this.handleTextInputChange}
            />
            <RichEditor
              editorState={this.state.editorState}
              onChange={this.handleEditorChange}
              placeholder="More details about your question..."
            />
            <Button
              onClick={() => this.handleClick(createQuestion)}
              loading={loading || error}
              style={{ marginTop: "1rem" }}
            >
              Publish your question
            </Button>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateQuestion;

const QuestionInput = styled.input`
  height: 3.5rem;
  padding: 0.5rem;
  width: 100%;
  border-bottom: 2px solid #ececfb;
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 500;
`;
