import React from "react";
import styled from "styled-components";

// import Input from "../components/input";
import TagPicker from "../components/tag-picker";

class PostInternship extends React.Component {
  state = {
    title: "",
    tags: [],
    imgBlob: ""
  };
  handleInputChange = e => {
    const title = e.target.value;
    this.setState({ title });
  };
  handleDeleteTag = i => {
    const { tags } = this.state;
    tags.splice(i, 1);
    this.setState({ tags });
  };

  handleAddTag = newTag => {
    const { tags } = this.state;
    let exists = false;
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
    console.log(e.target.files);
    const imgBlob = window.URL.createObjectURL(e.target.files[0]);
    this.setState({ imgBlob });
  };

  render() {
    const { tags, imgBlob } = this.state;
    return (
      <div style={{ padding: "0px 16px" }}>
        <H1>Share an internship and help students grow.</H1>
        <Wrapper>
          <div>
            <input
              type="file"
              name="avatar-img"
              id="avatar-img"
              onChange={this.handleInputFileChange}
            />
            {imgBlob && <img src={imgBlob} alt="internship avatar" />}
          </div>
          <InputWrapper>
            <InputLabel htmlFor="title">Title</InputLabel>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Internship title"
              onChange={this.handleInputChange}
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
        </Wrapper>
      </div>
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
  margin-top: 2rem;
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
  padding: 0.5rem 1rem;
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
