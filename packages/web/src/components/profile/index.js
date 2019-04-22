import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

import DropDown, { DropDownItem } from "../drop-down";
import { Text } from "../drop-down/style";
import {
  Avatar,
  UserAvatar,
  UserName,
  ProfileStyle,
  ProfileInfo
} from "./style";

const Profile = ({ user }) => {
  const Menu = () => (
    <Fragment>
      <ProfileInfo>
        <Avatar>
          <img src={user.avatar} alt={user.userName} />
        </Avatar>
        <div className="full-Width">
          <UserName>{user.userName}</UserName>
        </div>
      </ProfileInfo>
      <Link to="logout">
        <DropDownItem>
          <Text>Logout</Text>
        </DropDownItem>
      </Link>
    </Fragment>
  );
  return (
    <ProfileStyle>
      <DropDown overlay={<Menu />}>
        <UserAvatar>
          <img src={user.avatar} alt={user.userName} />
        </UserAvatar>
      </DropDown>
    </ProfileStyle>
  );
};

export default Profile;

Profile.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired
};
