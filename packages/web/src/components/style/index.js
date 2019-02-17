import styled from "styled-components";

import { MEDIA_AT_A } from "../../constants";

export const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;
export const Wrapper = styled.div`
  width: 100%;
  max-width: 1080px;
  min-height: calc(100vh - 120px);
  margin: 0 auto;
  padding: 0px 16px;
  @media (min-width: ${MEDIA_AT_A}) {
    padding: 0px;
  }
`;
export const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas: "main" "aside";
  grid-gap: 32px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 100vh;
  @media (min-width: ${MEDIA_AT_A}) {
    grid-template-columns: 3fr minmax(240px, 1fr);
    grid-template-areas: "main aside";
  }
`;
