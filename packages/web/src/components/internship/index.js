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
    const { title, location, createdAt, tags } = this.props;
    return (
      <InternshipCard>
        <InternshipAvatar>
          <img
            src="https://assets.brand.sh/file/brandsearch/google-plus.svg"
            alt="internship avatar"
          />
        </InternshipAvatar>
        <InternshipContent>
          <h1>{title}</h1>
          <a
            href="https://www.google.com/maps/place/Higher+Institute+Technology+Appliqu%C3%A9e/@30.4359913,-9.5877934,17z/data=!3m1!4b1!4m5!3m4!1s0xdb3b663a260c079:0x8dd0ffa41785e73d!8m2!3d30.4359867!4d-9.5856047"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LocationContainer>
              <Icon iconName="location" />
              <Location>{location}</Location>
            </LocationContainer>
          </a>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti,
            porro sunt odio delectus consequatur tempora molestias consectetur
            incidunt vel fuga? Dolor aperiam asperiores explicabo blanditiis,
            libero mollitia vitae ipsa nemo?
          </p>
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
