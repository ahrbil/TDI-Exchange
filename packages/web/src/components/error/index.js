import React from "react";
import styled from "styled-components";

export const Error = ({ message, ...rest }) => (
  <ErrorContainer {...rest}>{`* ${message}`}</ErrorContainer>
);

const ErrorContainer = styled.div`
  padding: 10px 6px;
  color: ${({ theme }) => theme.error.primary};
`;
