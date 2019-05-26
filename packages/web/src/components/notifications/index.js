import React, { Fragment } from "react";
import styled from "styled-components";
import { useSubscription, useQuery } from "react-apollo-hooks";
import { Link } from "@reach/router";

import Icon from "../icons";
import DropDown, { DropDownItem } from "../drop-down";
import { DropDownContent, DropDownItemStyle } from "../drop-down/style";
import { IconButton } from "../button";
import Loader, { Wrapper } from "../loader";
import { NEW_NOTIFICATION_SUBSCRIBE, ALL_NOTIFICATIONS } from "../../queries";
import { Avatar } from "../profile/style";
import { getRelativeTimePosted } from "../../utils";

const DropDownMenu = ({ notifications, markAllNotificationsSeen }) => {
  // mark all notifications as seen on component mounts
  React.useEffect(() => {
    markAllNotificationsSeen();
  }, []);

  return (
    <Fragment>
      {notifications.map(notification => {
        const question = JSON.parse(notification.payload);
        return (
          <Link to={`/questions/${question.id}`} key={notification.id}>
            <DropDownItem active={!notification.read}>
              <Avatar>
                <img
                  src={notification.actors[0].avatar}
                  alt={notification.actors[0].userName}
                />
              </Avatar>
              <h3>{notification.actors[0].userName}</h3>
              <p>
                <strong>answered your question:</strong> {question.header}
              </p>
              <span className="time-stamp">
                {getRelativeTimePosted(notification.createdAt)}
              </span>
            </DropDownItem>
          </Link>
        );
      })}
    </Fragment>
  );
};

const Notifications = () => {
  const [notifications, setNotifications] = React.useState([]);
  const notificationsSubs = useSubscription(NEW_NOTIFICATION_SUBSCRIBE);
  const { data, loading } = useQuery(ALL_NOTIFICATIONS);
  const counter = notifications.reduce((acc, notification) => {
    return notification.seen ? acc : acc + 1;
  }, 0);

  const markAllNotificationsSeen = React.useCallback(() => {}, []);
  // set notification to state
  React.useEffect(() => {
    if (data && data.allNotifications) {
      setNotifications(data.allNotifications);
    }
  }, [loading]);

  // merge upcoming notifications to old ones
  React.useEffect(() => {
    if (notificationsSubs.data) {
      const { newNotification } = notificationsSubs.data;
      setNotifications(prev => [newNotification, ...prev]);
    }
  }, [notificationsSubs.data]);
  return (
    <NotificationsBell>
      <DropDown
        overlay={
          <DropDownMenu
            notifications={notifications}
            markAllNotificationsSeen={markAllNotificationsSeen}
          />
        }
      >
        <IconButton>
          <Icon iconName="notifications" />
          {counter > 0 && <Badge>{counter}</Badge>}
        </IconButton>
      </DropDown>
    </NotificationsBell>
  );
};

const NotificationsBell = styled.div`
  padding: 3px;
  margin-right: 1rem;
  position: relative;
  ${DropDownContent} {
    min-width: 250px;
    max-height: calc(100vh - 35px);
    overflow-y: auto;
    strong {
      font-weight: 700;
    }
  }
  ${DropDownItemStyle} {
    flex-wrap: wrap;
    .time-stamp {
      font-size: 0.8rem;
      font-weight: 500;
      margin: 0.4rem 0;
    }
    h3 {
      font-size: 1rem;
      font-weight: 500;
    }
    p {
      font-size: 1rem;
      line-height: 1.8rem;
    }
  }
  ${Avatar} {
    width: 28px;
    min-width: 28px;
    height: 28px;
    box-shadow: none;
    margin-right: 0.5rem;
  }
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
