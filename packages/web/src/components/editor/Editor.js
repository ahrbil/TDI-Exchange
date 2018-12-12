import React from "react";
import { EditorState, convertToRaw } from "draft-js";
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
import RichBtn, { InputFileBtn } from "../button/editorBtns";

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
        maxWidth: "65vw",
        height: "auto",
      }}
    />
  );
};

class FullEditor extends React.Component {
  constructor(props) {
    super(props);
    const plugins = this.getPluginsReady(props);
    this.state = {
      editorState: EditorState.createEmpty(),
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
      ItalicButton: richButtons.ItalicButton,
      BoldButton: richButtons.BoldButton,
      MonospaceButton: richButtons.MonospaceButton,
      UnderlineButton: richButtons.UnderlineButton,
      CodeButton: richButtons.CodeButton,
      OLButton: richButtons.OLButton,
      ULButton: richButtons.ULButton,
      H1Button: richButtons.H1Button,
      H2Button: richButtons.H2Button,
      H3Button: richButtons.H3Button,
    };
  };

  handleChange = editorState => {
    this.setState({
      editorState,
    });
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
      this.handleChange(newState);
    });
  };

  logToRaw = () => {
    const content = this.state.editorState.getCurrentContent();
    const contentToRaw = JSON.stringify(convertToRaw(content),null,2);
    console.log(contentToRaw);
  };

  render() {
    const { editorState, plugins } = this.state;
    const {
      ItalicButton,
      BoldButton,
      MonospaceButton,
      UnderlineButton,
      CodeButton,
      OLButton,
      ULButton,
      H1Button,
      H2Button,
      H3Button,
    } = this.state;
    return (
      <E>
        <ToolBar>
          <BoldButton>
            <RichBtn iconName="b" inline />
          </BoldButton>
          <ItalicButton>
            <RichBtn iconName="i" inline />
          </ItalicButton>
          <UnderlineButton>
            <RichBtn iconName="u" inline />
          </UnderlineButton>
          <MonospaceButton>
            <RichBtn iconName="c" inline />
          </MonospaceButton>
          <OLButton>
            <RichBtn iconName="ol" block />
          </OLButton>
          <ULButton>
            <RichBtn iconName="ul" block />
          </ULButton>
          <CodeButton>
            <RichBtn iconName="code-block" block style={{ height: "14px" }} />
          </CodeButton>
          <H1Button>
            <RichBtn iconName="h1" block style={{ height: "13px" }} />
          </H1Button>
          <H2Button>
            <RichBtn iconName="h2" block style={{ height: "13px" }} />
          </H2Button>
          <H3Button>
            <RichBtn iconName="h3" block style={{ height: "13px" }} />
          </H3Button>
          <InputFileBtn onChange={this.handleChooseFile} iconName="image" />
          <button onClick={this.logToRaw}>LOG💫</button>
        </ToolBar>
        <EditorArea className="markdown">
          <Editor
            editorState={editorState}
            onChange={this.handleChange}
            plugins={plugins}
            customStyleMap={customStyleMap}
            stripPastedStyles={true}
            spellCheck={true}
            autoCapitalize="sentences"
            autoComplete="on"
            autoCorrect="on"
            placeholder="Write your answer here ..."
          />
        </EditorArea>
      </E>
    );
  }
}
export default FullEditor;

const EditorArea = styled.div`
  width: 100%;
  min-height: 200px;
  padding: 0.7rem;
  border-top: 2px solid ${props => props.theme.br_toolbar};
`;

const ToolBar = styled.div`
  padding: 0.5rem;
  width: 100%;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(34px, 1fr));
  background-color: ${props => props.theme.bg_toolbar};
`;

const E = styled.div`
  width: 100vw;
  border: 2px solid ${props => props.theme.br_toolbar};
  border-radius: 4px;
`;
