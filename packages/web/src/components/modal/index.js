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
  openModal = () => {
    this.setState({ isOpen: true });
  };
  closeModal = () => {
    this.setState({ isOpen: false });
  };
  render() {
    const { title, children, isOpen, closeModal } = this.props;
    return (
      isOpen && (
        <Portal>
          <ModalWrapper>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
              <ModalCloseBtn onClick={closeModal}>
                <Icon iconName="close" />
              </ModalCloseBtn>
            </ModalHeader>
            {children}
          </ModalWrapper>
          <ModalBackground onClick={closeModal} className="portal" />
        </Portal>
      )
    );
  }
}

export default Modal;
