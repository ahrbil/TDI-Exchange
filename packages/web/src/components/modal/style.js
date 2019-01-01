import styled from "styled-components";

export const ModalWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  background-color: white;
  position: relative;
  z-index: 1100;
  border-radius: 4.71px;
  padding: 1.2rem;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 24px;
  overflow: overlay;
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 1.1rem;
`;
export const ModalTitle = styled.div`
  font-weight: 800;
  font-size: 1.5rem;
  line-height: 28px;
`;
export const ModalBackground = styled.div`
  background: rgba(0, 0, 0, 0.75);
`;
export const ModalCloseBtn = styled.div`
  color: #636363;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  > div {
    height: 100%;
  }
`;
