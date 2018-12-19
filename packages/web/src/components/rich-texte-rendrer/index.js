import React from "react";
import { EditorState, convertFromRaw } from "draft-js";

import RichEditor from "../editor";

class RichRender extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }
  handleChange = () => {};

  componentDidMount = () => {
    const bodyFromJson = JSON.parse(this.props.body);
    const fromRaw = convertFromRaw(bodyFromJson);
    this.setState({ editorState: EditorState.createWithContent(fromRaw) });
  };

  render() {
    return (
      <RichEditor
        editorState={this.state.editorState}
        onChange={this.handleChange}
        readOnly
      />
    );
  }
}

export default RichRender;
