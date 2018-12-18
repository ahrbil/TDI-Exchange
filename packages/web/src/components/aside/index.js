import React from "react";
import styled from "styled-components";
import { Link } from "@reach/router";
import Button from "../button";

const Aside = () => (
  <AsideContainer>
    <Link to="/ask-a-question">
      <Button secondary>Ask A Question</Button>
    </Link>
  </AsideContainer>
);

export default Aside;

const AsideContainer = styled.div`
  grid-area: aside;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;
