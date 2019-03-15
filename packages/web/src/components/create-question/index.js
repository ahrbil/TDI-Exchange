import React from "react";
import styled from "styled-components";
import { EditorState, convertFromRaw } from "draft-js";
import { Mutation } from "react-apollo";
import { navigate } from "@reach/router";

import RichEditor from "../editor";
import Button, { TextButton } from "../button";
import {
  CREATE_QUESTION,
  UPDATE_QUESTION,
  QUESTION_WITH_DETAILS
} from "../../queries";
import { saveEditorStateToRaw, isEditorEmpty, formatError } from "../../utils";
import { Error } from "../error";

class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);
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

  handleClick = createOrUpdateQuestion => {
    // get the editor content and header from state
    const state = this.state.editorState.getCurrentContent();
    const { header } = this.state;
    const { isEditing, questionId } = this.props;
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
      // if it is editing mode we include question id to variables
      const variables = {
        header,
        body,
        ...(isEditing && { questionId })
      };
      //call createOrUpdateQuestion mutation with variables
      createOrUpdateQuestion({
        variables,
        refetchQueries: isEditing
          ? [{ query: QUESTION_WITH_DETAILS, variables: { id: questionId } }]
          : []
      })
        .then(({ data }) => {
          this.setState({ header: "", editorState: EditorState.createEmpty() });
          isEditing && this.props.setIsEditing(false);
          navigate(
            `/questions/${
              isEditing ? data.updateQuestion.id : data.createQuestion.id
            }`
          );
        })
        .catch(err => {
          // console.log(err)
        });
    }
  };

  componentDidMount = () => {
    const { isEditing, header, body } = this.props;
    if (isEditing) {
      if (body) {
        const fromRaw = convertFromRaw(JSON.parse(body));
        const editorState = EditorState.createWithContent(fromRaw);
        this.setState({
          editorState,
          header
        });
      } else {
        this.setState({
          header
        });
      }
    }
  };

  render() {
    const { headerError, editorError, header } = this.state;
    const { setIsEditing, isEditing } = this.props;
    const mutation = isEditing ? UPDATE_QUESTION : CREATE_QUESTION;
    return (
      <Mutation mutation={mutation}>
        {(createOrUpdateQuestion, { loading, error }) => (
          <div>
            {(headerError || error) && (
              <Error message={headerError || formatError(error)} />
            )}
            <QuestionInput
              placeholder="Your question..."
              onChange={this.handleTextInputChange}
              value={header}
              hasError={headerError || error}
            />
            <RichEditor
              editorState={this.state.editorState}
              onChange={this.handleEditorChange}
              placeholder="More details about your question..."
              hasError={editorError}
            />
            {editorError && <Error message={editorError} />}
            <BtnsWrapper>
              <Button
                onClick={() => this.handleClick(createOrUpdateQuestion)}
                loading={loading}
                style={{ marginRight: "0.5rem" }}
              >
                {isEditing ? "Save" : "Publish your question"}
              </Button>
              {!loading && isEditing && (
                <TextButton onClick={() => setIsEditing(false)}>
                  Cancel
                </TextButton>
              )}
            </BtnsWrapper>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateQuestion;

const QuestionInput = styled.textarea`
  padding: 0.5rem;
  width: 100%;
  border: 2px solid
    ${props => (props.hasError ? `${props.theme.error.primary}` : "#ececfb")};
  font-family: inherit;
  font-size: 1.6rem;
  font-weight: 500;
  margin-bottom: 1rem;
  transition: border 0.2s ease-in;
`;
const BtnsWrapper = styled.div`
  margin-top: 3.5rem;
  display: flex;
`;
