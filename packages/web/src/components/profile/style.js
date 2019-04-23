import styled from "styled-components";

import { DropDownContent, DropDownItemStyle } from "../drop-down/style";

export const Avatar = styled.div`
  width: 45px;
  min-width: 45px;
  height: 45px;
  background-color: aliceblue;
  border-radius: 100%;
  overflow: hidden;
  margin-right: 1rem;
  box-shadow: 0px 3px 9px #0000004a;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
  }
`;

export const UserAvatar = styled.button`
  width: 32px;
  height: 32px;
  background: aliceblue;
  display: block;
  cursor: pointer;
  border-radius: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const UserName = styled.h1`
  font-weight: bold;
  font-size: 0.8rem;
`;

export const ProfileStyle = styled.div`
  ${DropDownContent} {
    padding-top: 0;
    width: 250px;
  }
  .full-Width {
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ProfileInfo = styled(DropDownItemStyle)`
  background-color: rgb(247, 249, 250);
  cursor: auto;
  padding: 1rem 16px;
  margin-bottom: 0.4rem;
  flex-direction: row;
  align-items: center;
  border: none;
`;
