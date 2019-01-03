import React from "react";
import styled from "styled-components";

const Error = ({ message, ...rest }) => (
  <ErrorContainer {...rest}>{`* ${message}`}</ErrorContainer>
);

export default Error;

const ErrorContainer = styled.div`
  padding: 10px 6px;
  color: ${({ theme }) => theme.error.primary};
`;
