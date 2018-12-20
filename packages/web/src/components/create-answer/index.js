import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { EditorState, convertToRaw } from "draft-js";

import RichEditor from "../editor";
import { CREATE_ANSWER } from "../../queries";
import Button from "../button";

export default class CreateAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  handleEditorChange = editorState => {
    this.setState({
      editorState
    });
  };

  saveEditorStateToRaw = () => {
    const content = this.state.editorState.getCurrentContent();
    const contentToRaw = JSON.stringify(convertToRaw(content));
    return contentToRaw;
  };

  handleClick = createAnswer => {
    const { questionId } = this.props;
    const body = this.saveEditorStateToRaw();
    createAnswer({
      variables: {
        questionId,
        body
      }
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ANSWER}>
        {(createAnswer, { loading, error }) => (
          <CreateAnswerCard>
            <RichEditor
              editorState={this.state.editorState}
              onChange={this.handleEditorChange}
              placeholder="Write your answer here ..."
            />
            <Button
              loading={loading || error}
              onClick={() => this.handleClick(createAnswer)}
              style={{ marginTop: "1rem" }}
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
  margin-top: 3rem;
`;
