import React from "react";
import Editor from "draft-js-plugins-editor";
import styled from "styled-components";
import createLinkifyPlugin from "draft-js-linkify-plugin";
import createRichButtonsPlugin from "draft-js-richbuttons-plugin";
import Prism from "prismjs";
import "prismjs/components/prism-csharp.min.js";
import "prismjs/components/prism-sql.min.js";
import createPrismPlugin from "draft-js-prism-plugin";
import createCodeEditorPlugin from "draft-js-code-editor-plugin";
import createBlockBreakoutPlugin from "draft-js-block-breakout-plugin";
import createImagePlugin from "draft-js-image-plugin";
import createMarkdownPlugin from "draft-js-markdown-plugin";

import { customStyleMap } from "./style";
import ToolBar from "./toolBar";

import "draft-js/dist/Draft.css";
import "prismjs/themes/prism.css";

const languages = {
  select: "Select A Language",
  js: "JavaScript",
  css: "CSS",
  html: "HTML",
  sql: "SQL",
  csharp: "C#"
};

const Img = props => {
  const { src } = props.contentState
    .getEntity(props.block.getEntityAt(0))
    .getData();
  return (
    <img
      src={src}
      alt="test"
      style={{
        width: "100%",
        maxWidth: "100%",
        height: "auto",
      }}
    />
  );
};

class RichEditor extends React.Component {
  constructor(props) {
    super(props);
    const plugins = this.getPluginsReady(props);
    this.state = {
      ...plugins,
    };
  }

  getPluginsReady = (props) => {
    const codePlugin = createCodeEditorPlugin();
    const blockBreakoutPlugin = createBlockBreakoutPlugin();
    const richButtons = createRichButtonsPlugin();
    const prismPlugin = createPrismPlugin({
      prism: Prism,
    });
    const linkifyPlugin = createLinkifyPlugin({
      target: "_blank",
    });
    const markdownPlugin = createMarkdownPlugin({ languages });
    const imagePlugin = createImagePlugin({
      imageComponent: Img,
    });
    return {
      plugins: [
        codePlugin,
        blockBreakoutPlugin,
        richButtons,
        prismPlugin,
        linkifyPlugin,
        markdownPlugin,
        imagePlugin,
      ],
      addImage: imagePlugin.addImage,
      editorButtons : {
        ItalicButton: richButtons.ItalicButton,
        BoldButton: richButtons.BoldButton,
        MonospaceButton: richButtons.MonospaceButton,
        UnderlineButton: richButtons.UnderlineButton,
        CodeButton: richButtons.CodeButton,
        OLButton: richButtons.OLButton,
        ULButton: richButtons.ULButton,
      }
    };
  };

  handleChooseFile = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.addEventListener("load", () => {
      const newState = this.state.addImage(
        this.state.editorState,
        reader.result,
      );
      this.props.onChange(newState);
    });
  };

  render() {
    const { plugins,editorButtons } = this.state;
    const {
      editorState,
      onChange,
      placeholder,
      readOnly } = this.props ;
    return (
        <E>
          {!readOnly && <ToolBar editorButtons={editorButtons}/>}
          <EditorArea className="markdown">
            <Editor
              editorState={editorState}
              onChange={onChange}
              plugins={plugins}
              customStyleMap={customStyleMap}
              stripPastedStyles={true}
              spellCheck={true}
              autoCapitalize="sentences"
              autoComplete="on"
              autoCorrect="on"
              placeholder= {placeholder}
              readOnly={readOnly}
            />
          </EditorArea>
        </E>
    );
  }
}
export default RichEditor;

const EditorArea = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 0.7rem;
`;

const E = styled.div`
  width: 100%;
  border: 2px solid ${props => props.theme.br_toolbar};
  border-radius: 4px;
`;
