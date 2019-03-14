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

const Modal = ({ title, children, isOpen, closeModal }) => {
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
};

export default Modal;
