import React from "react";

import Portal from "./portal";
import Icon from "../icons";
import {
  ModalWrapper,
  ModalHeader,
  ModalTitle,
  ModalCloseBtn,
  ModalBackground
} from "./style";

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }
  openModal = () => {
    this.setState({ isOpen: true });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { isOpen } = this.state;
    const { title, children } = this.props;
    return (
      isOpen && (
        <Portal>
          <ModalWrapper>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <ModalCloseBtn onClick={this.closeModal}>
                <Icon iconName="close" />
              </ModalCloseBtn>
            </ModalHeader>
            {children && children(this.openModal)}
          </ModalWrapper>
          <ModalBackground onClick={this.closeModal} className="portal" />
        </Portal>
      )
    );
  }
}

export default Modal;
