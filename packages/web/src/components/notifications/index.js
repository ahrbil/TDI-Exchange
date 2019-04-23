import React from "react";
import styled from "styled-components";

import Icon from "../icons";
import DropDown, { DropDownItem } from "../drop-down";
import { IconButton } from "../button";

const Notifications = () => {
  return (
    <NotificationsStyle>
      <DropDown>
        <IconButton>
          <Icon iconName="notifications" />
          <Badge>9+</Badge>
        </IconButton>
      </DropDown>
    </NotificationsStyle>
  );
};

const NotificationsStyle = styled.div`
  padding: 3px;
  margin-right: 1rem;
  position: relative;
`;

const Badge = styled.div`
  position: absolute;
  z-index: 10;
  transform-origin: 100% 0%;
  transform: translate(50%, -50%);
  border-radius: 10px;
  padding: 0 5px;
  height: 18px;
  min-width: 18px;
  background-color: #ff5630;
  color: white;
  line-height: 18px;
  font-size: 10px;
  text-align: center;
  white-space: nowrap;
`;

export default Notifications;
