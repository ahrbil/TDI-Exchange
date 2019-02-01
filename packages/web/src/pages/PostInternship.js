import React from "react";
import styled from "styled-components";

import TagPicker from "../components/tag-picker";
import Icon from "../components/icons";
import { FILE_TYPES, FILE_SIZE } from "../constants";
import Button from "../components/button";
import { Mutation } from "react-apollo";
import { CREATE_INTERNSHIP } from "../queries";

class PostInternship extends React.Component {
  state = {
    title: "",
    description: "",
    location: "",
    tags: [],
    imgUrl: "",
    imgFile: null
  };
  // save input value to the state
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };
  // passing the index of the tag to delete it
  // and update the state
  handleDeleteTag = i => {
    const { tags } = this.state;
    tags.splice(i, 1);
    this.setState({ tags });
  };
  //passing the new tag to add it to the state
  handleAddTag = newTag => {
    const { tags } = this.state;
    let exists = false;
    // check if the tag is not exists to avoids duplication
    for (let i = 0; i < tags.length; i++) {
      if (tags[i].name === newTag.name) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      const tags = [...this.state.tags, newTag];
      this.setState({ tags });
    }
  };

  handleInputFileChange = e => {
    // getting the type and size of selected file
    const { type, size } = e.target.files[0];

    // if the file is valid and have the right size and type
    if (FILE_TYPES.includes(type) && size < FILE_SIZE) {
      // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Using_object_URLs_to_display_images
      const imgUrl = (window.URL || window.webkitURL).createObjectURL(
        e.target.files[0]
      );
      this.setState({ imgUrl, imgFile: e.target.files[0] });
    }
  };

  handleImageLoad = () => {
    // release the object URL from memory
    (window.URL || window.webkitURL).revokeObjectURL(this.state.imgUrl);
  };

  handleSubmit = async createInternship => {
    const { title, description, location, imgFile } = this.state;
    const tags = this.state.tags.map(tag => ({ name: tag.name }));
    const variables = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      tags,
      imgFile
    };
    createInternship({ variables });
  };

  render() {
    const { tags, imgUrl, title, description, location } = this.state;
    return (
      <Mutation mutation={CREATE_INTERNSHIP}>
        {(createInternship, { data, loading }) => (
          <div style={{ padding: "0px 16px" }}>
            <H1>Share an internship and help students grow.</H1>
            <Wrapper>
              <AvatarLabel htmlFor="avatar-img">
                Avatar
                <input
                  type="file"
                  name="avatar-img"
                  id="avatar-img"
                  onChange={this.handleInputFileChange}
                  multiple={false}
                  accept={FILE_TYPES}
                  maxsize={FILE_SIZE}
                />
                <AvatarPreview>
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      alt="internship avatar"
                      onLoad={this.handleImageLoad}
                    />
                  )}
                  {!imgUrl && (
                    <UploadStyle>
                      <Icon iconName="camera" />
                    </UploadStyle>
                  )}
                </AvatarPreview>
              </AvatarLabel>
              <InputWrapper>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input
                  required
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Internship title"
                  onChange={this.handleInputChange}
                  value={title}
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="description">Description</InputLabel>
                <TextArea
                  as="textarea"
                  name="description"
                  id="description"
                  placeholder="Internship description"
                  onChange={this.handleInputChange}
                  value={description}
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="tag">Tags</InputLabel>
                <TagPicker
                  tags={tags}
                  handleDeleteTag={this.handleDeleteTag}
                  handleAddTag={this.handleAddTag}
                />
              </InputWrapper>
              <InputWrapper>
                <InputLabel htmlFor="location">Location</InputLabel>
                <TextArea
                  as="textarea"
                  name="location"
                  id="location"
                  placeholder="Internship location"
                  onChange={this.handleInputChange}
                  value={location}
                />
              </InputWrapper>
              <Button
                loading={loading}
                style={{ alignSelf: "flex-start" }}
                onClick={() => this.handleSubmit(createInternship)}
              >
                Publish
              </Button>
            </Wrapper>
          </div>
        )}
      </Mutation>
    );
  }
}

export default PostInternship;

const H1 = styled.h1`
  font-size: 1.2rem;
  font-weight: 500;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 20px;
`;
const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 500;
`;

const Input = styled.input`
  border: 1px solid #d9d9d9;
  border-radius: 4.71px;
  max-width: 350px;
  outline: none;
  padding: 0.6rem 1rem;
  font-size: 1.1rem;
  transition: all 0.2s ease-in;
  &::placeholder {
    font-size: 1rem;
  }
  &:focus {
    box-shadow: 0px 0px 0px 2px inset ${props => props.theme.color.primary};
    border-color: transparent;
  }
`;
const TextArea = styled(Input)`
  min-height: 4rem;
  height: 5rem;
  font-family: inherit;
`;

const AvatarPreview = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 10px;
  background-color: white;
  border: 1px solid #d9d9d9;
  border-radius: 4.71px;
  overflow: hidden;
  transition: all 0.2s ease-in;
  &:hover,
  &:active {
    box-shadow: 0px 0px 0px 2px ${props => props.theme.color.primary};
    border-color: transparent;
  }
  > img {
    width: 100%;
    height: 100%;
    min-height: 100%;
    object-fit: cover;
  }
`;

const AvatarLabel = styled(InputLabel)`
  width: 150px;
  position: relative;
  margin-bottom: 20px;
  cursor: pointer;
  > input {
    visibility: hidden;
    position: absolute;
    width: 1px;
    height: 1px;
  }
`;

const UploadStyle = styled.div`
  background-color: hsl(0, 1%, 28%);
  width: 100%;
  height: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  > div {
    height: 45px;
  }
`;
