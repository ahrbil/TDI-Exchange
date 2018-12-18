import React from "react";
import styled from "styled-components";

import { RichBtn, InputFileBtn } from "../button";

const ToolBar = ({ editorButtons }) => {
  const {
    ItalicButton,
    BoldButton,
    MonospaceButton,
    UnderlineButton,
    CodeButton,
    OLButton,
    ULButton,
  } = editorButtons;
  return (
    <ToolBarStyle>
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
      {/* <InputFileBtn onChange={this.handleChooseFile} iconName="image" /> */}
    </ToolBarStyle>
  );
};

export default ToolBar;

const ToolBarStyle = styled.div`
  padding: 0.5rem;
  width: 100%;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(auto-fill, minmax(34px, 1fr));
  background-color: ${props => props.theme.bg_toolbar};
  border-bottom: 2px solid ${props => props.theme.br_toolbar};
`;
