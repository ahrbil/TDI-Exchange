import React from "react";
import styled from "styled-components";

import { ReactComponent as NotFoundSvg } from "../components/svgs/404.svg";

const NotFoundPage = () => (
  <Container>
    <SvgWrapper>
      <NotFoundSvg />
    </SvgWrapper>
    <h3>Page not found.</h3>
  </Container>
);
export default NotFoundPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 120px);
  padding: 16px;
  > h3 {
    margin-top: 1rem;
  }
`;

const SvgWrapper = styled.div`
  > svg {
    width: 100%;
    height: 100%;
  }
`;
