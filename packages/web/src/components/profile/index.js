import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "@reach/router";

import Icon from "../icons";

const Profile = ({ user }) => (
  <ProfileStyle>
    <img src={user.avatar} alt={user.userName} />
    <DropDown>
      <DropDownItem>
        <h1>{user.userName}</h1>
      </DropDownItem>
      <Link to="logout">
        <DropDownItem>
          <Icon
            iconName="logout"
            style={{ marginRight: "12px", width: "21px" }}
          />
          logout
        </DropDownItem>
      </Link>
    </DropDown>
  </ProfileStyle>
);

export default Profile;

const ProfileStyle = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  border-radius: 100%;
  transition: all 0.2s ease-in;
  border: 2px solid transparent;
  &:hover,
  &:active {
    background-color: #f8f8f8;
    border-color: ${props => props.theme.color.primary};
    > div {
      visibility: visible;
    }
  }
  h1 {
    font-size: 0.8rem;
    font-weight: 700;
    margin-right: 11px;
  }
  img {
    width: 31px;
    height: 31px;
    border-radius: 100%;
  }
`;

const DropDown = styled.div`
  display: flex;
  visibility: hidden;
  position: absolute;
  right: 5px;
  top: 45px;
  background-color: white;
  box-shadow: 3px 3px 18px 0px #d3d3d9;
  flex-direction: column;
  &:after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 90%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent white transparent;
  }
`;

const DropDownItem = styled.span`
  font-size: 1rem;
  padding: 10px 20px;
  font-weight: 600;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  border-bottom: 3px solid transparent;
  transition: border-color 0.2s ease-in;
  &:hover {
    border-bottom: 3px solid ${props => props.theme.color.primary};
  }
`;

Profile.propTypes = {
  user: PropTypes.shape({
    userName: PropTypes.string,
    avatar: PropTypes.string
  }).isRequired
};
