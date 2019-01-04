import React from "react";
import styled, { css } from "styled-components";
import Icon from "../icons";

export const Error = ({ message, ...rest }) => (
  <ErrorContainer {...rest}>{`* ${message}`}</ErrorContainer>
);

export const ErrorIcon = ({ hasError }) => (
  <ErrorIconStyle hasError={hasError}>
    <Icon className="initScale" iconName="error" />
  </ErrorIconStyle>
);

const ErrorContainer = styled.div`
  padding: 10px 6px;
  color: ${({ theme }) => theme.error.primary};
  position: absolute;
`;

const ErrorIconStyle = styled.div`
  .initScale {
    transition: all 0.2s ease-in;
    transform: scale(0);
    ${props =>
      props.hasError &&
      css`
        transform: scale(1);
      `}
  }
  width: 32px;
  position: absolute;
  right: 0;
  bottom: 20px;
  color: ${({ theme }) => theme.error.primary};
`;
