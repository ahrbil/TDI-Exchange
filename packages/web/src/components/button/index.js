import styled from "styled-components";
import RichBtn, { InputFileBtn } from "./editorBtns";

const Button = styled.button`
  display: flex;
  flex: none;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 3.14px;
  font-weight: 600;
  white-space: nowrap;
  word-break: keep-all;
  cursor: pointer;
  font-size: 15px;
  position: relative;
  text-align: center;
  padding: 12px 32px;
  color: white;
  background-color: ${props => props.theme.color.primary};
  transition: box-shadow 0.2s ease-out;
  &:hover {
    box-shadow: 3px 3px 18px 0px #d3d3d9;
  }
`;

export default Button;
export { RichBtn, InputFileBtn };
