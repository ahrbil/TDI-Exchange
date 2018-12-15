import React from "react";
import styled from "styled-components";
import Button from "../button";

const Aside = () => (
  <AsideContainer>
    <Button>Ask A Question</Button>
  </AsideContainer>
);

export default Aside;

const AsideContainer = styled.div`
  grid-area: aside;
  align-items: stretch;
  display: flex;
  flex-direction: column;
  ${Button} {
    width: 100%;
    background-color: #01ce77;
  }
`;
