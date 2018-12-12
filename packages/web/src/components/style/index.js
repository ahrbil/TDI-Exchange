import styled from "styled-components";

export const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;
export const Wrapper = styled.div`
  width: 100%;
  margin-top: 80px;
`;
export const ButtonWrapper = styled.div`
  grid-area: profile / profile / profile / profile;
`;
export const SearchWrapper = styled.div`
  grid-area: search / search / search / search;
  position: relative;
  &:focus-within {
    grid-area: logo / logo / profile/ profile;
    z-index: 200;
  }
`;
