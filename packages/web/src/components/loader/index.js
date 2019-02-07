import React from "react";
import styled from "styled-components";
import { HalfCircleSpinner } from "react-epic-spinners";
import PropTypes from "prop-types";

const Loader = ({ inline }) => (
  <Container inline={inline}>
    <HalfCircleSpinner
      color={inline ? "#fff" : "#1d49e3"}
      size={inline ? "20" : "35"}
    />
  </Container>
);

export default Loader;

Loader.defaultProps = {
  inline: false
};

Loader.propTypes = {
  inline: PropTypes.bool
};

const Container = styled.div`
  ${props => !props.inline && "box-shadow: 0px 0px 5px #8c8282"}
  ${props => !props.inline && "padding: 0.25rem"}
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${props => (props.inline ? "15px" : "30px")};
  height: ${props => (props.inline ? "15px" : "30px")};
  pointer-events: none;
  .half-circle-spinner {
    width: 100%;
    height: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px;
`;
