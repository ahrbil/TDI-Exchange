import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { EditorState } from "draft-js";

import RichEditor from "../editor";
import { CREATE_ANSWER } from "../../queries";
import Button from "../button";
import { saveEditorStateToRaw, isValidEditorContent } from "../../utils";
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

  handleClick = createAnswer => {
    const state = this.state.editorState.getCurrentContent();
    const errorMsg = isValidEditorContent(state);
    this.setState({ errorMsg });
    if (!errorMsg) {
      const { questionId } = this.props;
      const body = saveEditorStateToRaw(state);
      createAnswer({
        variables: {
          questionId,
          body
        }
      }).then(() => this.setState({ editorState: EditorState.createEmpty() }));
    }
  };

  render() {
    const { editorState, errorMsg } = this.state;
    return (
      <Mutation mutation={CREATE_ANSWER}>
        {(createAnswer, { loading, error }) => (
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
            <Button
              loading={loading || error}
              onClick={() => this.handleClick(createAnswer)}
              style={{ marginTop: "2rem" }}
            >
              Publish Your Answer
            </Button>
          </CreateAnswerCard>
        )}
      </Mutation>
    );
  }
}

const CreateAnswerCard = styled.div`
  position: relative;
  .errorContainer {
    position: absolute;
    bottom: 35px;
    left: 0;
  }
`;
