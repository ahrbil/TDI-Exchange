import React from "react";
import { EditorState, convertFromRaw } from "draft-js";

import RichEditor from "../editor";

class RichRender extends React.Component {
  constructor(props) {
    super(props);
    const bodyFromJson = JSON.parse(this.props.body);
    const fromRaw = convertFromRaw(bodyFromJson);

    this.state = {
      editorState: EditorState.createWithContent(fromRaw)
    };
  }

  handleChange = editorState => {
    this.setState({ editorState });
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
