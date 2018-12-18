import React from "react";
import { Mutation } from "react-apollo";
import { EditorState, convertToRaw,convertToHTML } from "draft-js";

import RichEditor from "../editor";
import { CREATE_ANSWER } from "../../queries";
import Button from "../button";

export default class CreateAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  handleEditoChange = editorState => {
    this.setState({
      editorState,
    });
  };

  logToRaw = () => {
    const content = this.state.editorState.getCurrentContent();
    const contentToRaw = JSON.stringify(convertToRaw(content),null,2);
    this.setState({rawState:contentToRaw})
    console.log(contentToRaw);
  };

  handleSubmitBtn = () => {
    let body = this.state.rawState;
    const id = this.props.id;
    console.log(this.props);
    this.props.createAnswer({variables:{questionId: id,body}});
  }

  render() {
    return (
      <Mutation mutation={CREATE_ANSWER}>
        {(createAnswer, { loading }) => (
          <>
            <RichEditor 
              editorState = {this.state.editorState} 
              onChange={this.handleEditoChange} 
              placeholder="Write your answer here ..."
            /> 
            <Button onClick={this.logToRaw}>Publish Your Answer</Button>
          </>
        )}
      </Mutation>
    );
  }
}
