import React from "react";
import { Mutation } from "react-apollo";
import { EditorState, convertToRaw } from "draft-js";

import RichEditor from "../editor";
import { CREATE_ANSWER } from "../../queries";
import Button from "../button";

export default class CreateAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      rawEditorState: "",
    };
  }

  handleEditorChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  saveEditorStateToRaw = () => {
    const content = this.state.editorState.getCurrentContent();
    const contentToRaw = JSON.stringify(convertToRaw(content),null,2);
    return contentToRaw
  };

  handleClick = (createAnswer) => {
    const {questionId} = this.props;
    const body = this.saveEditorStateToRaw();
    createAnswer({variables:{
      questionId, body
    }})
  }

  render() {
    const {rawEditorState} = this.state;
    const {questionId} = this.props;
    return (
      <Mutation 
        mutation={CREATE_ANSWER} 
        variables={{questionId, body:rawEditorState}}>
        {(createAnswer, { loading,error }) => (
          <div>
            <RichEditor 
              editorState = {this.state.editorState} 
              onChange={this.handleEditorChange} 
              placeholder="Write your answer here ..."
            /> 
            <Button 
              loading ={loading || error} 
              onClick = {() => this.handleClick(createAnswer)}
            >
              Publish Your Answer
            </Button>
          </div>
        )}
      </Mutation>
    );
  }
}
