import React from "react";

import RichEditor from "../editor";
import { getEditorStateFromRaw } from "../../utils";

const RichRender = ({ body }) => {
  const editorContent = getEditorStateFromRaw(body);
  const [editorState, setEditorState] = React.useState(editorContent);

  const handleChange = state => {
    setEditorState(state);
  };
  // update editorSate if body changes
  React.useEffect(() => {
    handleChange(getEditorStateFromRaw(body));
  }, [body]);

  return (
    <RichEditor editorState={editorState} onChange={handleChange} readOnly />
  );
};

export default RichRender;
