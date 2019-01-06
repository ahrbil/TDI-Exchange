import styled from "styled-components";

export const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;
export const Wrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 120px);
`;
export const ButtonWrapper = styled.div`
  grid-area: profile;
`;
export const HomeGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(240px, 1fr);
  grid-template-areas: "questions aside";
  grid-gap: 32px;
  width: 100%;
  min-width: 100%;
  max-width: 100%;
  min-height: 100vh;
`;
export const SearchWrapper = styled.div`
  grid-area: search;
  position: relative;
  &:focus-within {
    grid-area: logo / logo / profile/ profile;
    z-index: 200;
  }
`;
