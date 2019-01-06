import React from "react";
import styled from "styled-components";

import Modal from "../modal";
import Button from "../button";
import LogInBtns from "../log-in-btns";

class LogInModal extends React.Component {
  state = {
    isOpen: false
  };
  openModal = () => {
    this.setState({ isOpen: true });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { isOpen } = this.state;
    return (
      <LogInModalContainer>
        <div>Sign in to post an answer</div>
        <Button onClick={this.openModal}>Sign In</Button>
        <Modal title="Sign In" isOpen={isOpen} closeModal={this.closeModal}>
          <LogInBtns />
        </Modal>
      </LogInModalContainer>
    );
  }
}

const LogInModalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  > div {
    line-height: 1.25;
    font-size: 1rem;
    font-weight: 500;
  }
`;

export default LogInModal;
