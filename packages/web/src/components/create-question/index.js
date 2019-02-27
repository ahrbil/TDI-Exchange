import React from "react";
import styled from "styled-components";
import { EditorState } from "draft-js";
import { Mutation } from "react-apollo";
import { navigate } from "@reach/router";

import RichEditor from "../editor";
import Button from "../button";
import { CREATE_QUESTION } from "../../queries";
import { saveEditorStateToRaw, isEditorEmpty, formatError } from "../../utils";
import { Error, ErrorIcon } from "../error";

class CreateQuestion extends React.Component {
  constructor() {
    super();
    this.state = {
      editorState: EditorState.createEmpty(),
      header: "",
      editorError: "",
      headerError: ""
    };
  }

  handleEditorChange = editorState => {
    this.setState({
      editorState,
      editorError: ""
    });
  };

  handleTextInputChange = e => {
    const header = e.target.value;
    this.setState({
      header,
      headerError: ""
    });
  };
  // check if question header have an error if so update the state
  // and return true otherwise return false
  checkHeaderError = header => {
    if (header.length === 0) {
      this.setState({
        headerError: "this field is required"
      });
      return true;
    }
    if (header.length < 3 && header.length > 0) {
      this.setState({
        headerError: "too short, minimum length of 3 character"
      });
      return true;
    }
    return false;
  };

  checkBodyError = state => {
    const currentContentLength = state.getPlainText().trim().length;
    if (currentContentLength > 0 && currentContentLength < 10) {
      this.setState({
        editorError: "too short, minimum length of 10 character"
      });
      return true;
    }
    return false;
  };

  handleClick = createQuestion => {
    // get the editor content and header from state
    const state = this.state.editorState.getCurrentContent();
    const { header } = this.state;
    let body;

    // check if editor is empty
    const isEmptyBody = isEditorEmpty(state);

    // get error state and update the error message
    const isHeaderHasError = this.checkHeaderError(header);
    const isBodyHasError = this.checkBodyError(state);

    if (!isHeaderHasError && !isBodyHasError) {
      // if there is no error
      // make the body null
      if (isEmptyBody) {
        body = null;
      }
      // if body has content save it
      if (!isEmptyBody) {
        body = saveEditorStateToRaw(state);
      }
      // call createQuestion mutation with variables
      createQuestion({
        variables: {
          header,
          body
        }
      }).then(({ data }) => {
        this.setState({ header: "", editorState: EditorState.createEmpty() });
        navigate(`/questions/${data.createQuestion.id}`);
      });
    }
  };

  render() {
    const { headerError, editorError, header } = this.state;
    return (
      <Mutation mutation={CREATE_QUESTION}>
        {(createQuestion, { loading, error }) => (
          <div>
            <InputWrapper>
              {(headerError || error) && (
                <Error message={headerError || formatError(error)} />
              )}
              <QuestionInput
                placeholder="Your question..."
                onChange={this.handleTextInputChange}
                value={header}
                hasError={headerError || error}
              />
              <ErrorIcon hasError={headerError || error} />
            </InputWrapper>
            <RichEditor
              editorState={this.state.editorState}
              onChange={this.handleEditorChange}
              placeholder="More details about your question..."
              hasError={editorError}
            />
            {editorError && <Error message={editorError} />}
            <Button
              onClick={() => this.handleClick(createQuestion)}
              loading={loading}
              style={{ marginTop: "3.5rem" }}
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
  border-bottom: 2px solid
    ${props => (props.hasError ? `${props.theme.error.primary}` : "#ececfb")};
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 1.6rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease-in;
`;
const InputWrapper = styled.div`
  position: relative;
`;
