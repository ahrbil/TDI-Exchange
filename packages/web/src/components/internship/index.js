import React from "react";
import { Link } from "@reach/router";
import PropType from "prop-types";

import { getRelativeTimePosted } from "../../utils";
import Icon from "../icons";
import {
  InternshipCard,
  InternshipAvatar,
  InternshipContent,
  LocationContainer,
  TagContainer,
  Tag,
  PostedTime,
  TagText,
  Location
} from "./style";

class Internship extends React.Component {
  static defaultProps = {
    location: ""
  };
  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  render() {
    const {
      title,
      location,
      createdAt,
      tags,
      description,
      avatar
    } = this.props;
    return (
      <InternshipCard>
        <InternshipAvatar>
          <img src={avatar} alt="internship avatar" />
        </InternshipAvatar>
        <InternshipContent>
          <h1>{title}</h1>
          <LocationContainer>
            <Icon iconName="location" />
            <Location>{location}</Location>
          </LocationContainer>
          <p>{description}</p>
          <TagContainer>
            {tags.map(tag => (
              <Link to={`/internships/tags/${tag.name}`} key={tag.id}>
                <Tag>
                  <TagText>{tag.name}</TagText>
                </Tag>
              </Link>
            ))}
          </TagContainer>
          <PostedTime>{getRelativeTimePosted(createdAt)}</PostedTime>
        </InternshipContent>
      </InternshipCard>
    );
  }
}

export default Internship;

Internship.propTypes = {
  title: PropType.string.isRequired,
  location: PropType.string,
  createdAt: PropType.string.isRequired,
  tags: PropType.arrayOf(
    PropType.shape({
      id: PropType.string,
      name: PropType.string
    })
  ).isRequired
};
