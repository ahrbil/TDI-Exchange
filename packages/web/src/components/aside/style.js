import styled from "styled-components";

import { MEDIA_AT_A } from "../../constants";

export const AsideContainer = styled.div`
  grid-area: aside;
  align-items: stretch;
  display: flex;
  flex-direction: column;
`;

export const AsideItem = styled.div`
  padding: 12px;
  margin-bottom: 1rem;
  border: 1px solid #f2f2f2;
  border-radius: ${props => props.theme.border.rd};
  box-shadow: 1px 1px ${props => props.theme.shadow.primary};
`;

export const Sticky = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  @media (min-width: ${MEDIA_AT_A}) {
    position: sticky;
    top: 80px;
  }
`;
