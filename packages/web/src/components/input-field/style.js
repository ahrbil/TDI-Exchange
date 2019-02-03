import styled, { css } from "styled-components";

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
`;
export const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
  &::first-letter {
    text-transform: uppercase;
  }
`;

export const InputStyle = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 4.71px;
  max-width: 350px;
  outline: none;
  padding: 0.6rem 1rem;
  font-size: 1.1rem;
  transition: box-shadow 0.2s ease-in;
  &::placeholder {
    font-size: 1rem;
  }
  &:focus,
  &:active {
    box-shadow: 0px 0px 0px 2px inset ${props => props.theme.color.primary};
    border-color: transparent;
  }
  ${props =>
    props.hasError &&
    css`
      box-shadow: 0px 0px 0px 2px inset ${props.theme.error.primary};
      border-color: transparent;
    `}
`;

export const TextArea = styled(InputStyle)`
  min-height: 4rem;
  height: 5rem;
  font-family: inherit;
`;

export const PError = styled.p`
  color: ${props => props.theme.error.primary};
  margin-left: 0.6rem;
`;
