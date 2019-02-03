import React from "react";
import styled, { css } from "styled-components";

import Icon from "../icons";
import { InputLabel, PError } from "../input-field/style";

const AvatarPicker = ({
  field,
  form: { errors },
  setFieldValue,
  setAvatarPreviewUrl,
  avatarPreviewUrl,
  releaseAvatarPreviewUrl,
  onBlur,
  title,
  accept,
  maxsize
}) => (
  <>
    <AvatarLabel htmlFor={field.name}>
      {title}
      <input
        type={field.name}
        name={field.name}
        id={field.name}
        onBlur={onBlur}
        onChange={event => {
          setFieldValue(field.name, event.target.files[0]);
          setAvatarPreviewUrl(event.target.files[0]);
        }}
        multiple={false}
        accept={accept}
        maxsize={maxsize}
      />
      <AvatarPreview hasError={!!errors[field.name]}>
        {avatarPreviewUrl && (
          <img
            src={avatarPreviewUrl}
            alt="internship avatar"
            onLoad={releaseAvatarPreviewUrl}
          />
        )}
        {!avatarPreviewUrl && (
          <UploadStyle>
            <Icon iconName="camera" />
          </UploadStyle>
        )}
      </AvatarPreview>
    </AvatarLabel>
    {errors[field.name] && <PError>{errors[field.name]}</PError>}
  </>
);

export default AvatarPicker;

const AvatarPreview = styled.div`
  width: 150px;
  height: 150px;
  margin-top: 10px;
  background-color: white;
  border: 2px solid #d9d9d9;
  border-radius: 4.71px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in;
  &:hover,
  &:active,
  &:focus {
    box-shadow: 0px 0px 0px 2px
      ${props =>
        props.hasError ? props.theme.error.primary : props.theme.color.primary};
    border-color: transparent;
  }

  > img {
    width: 100%;
    height: 100%;
    min-height: 100%;
    object-fit: cover;
  }
  ${props =>
    props.hasError &&
    css`
      box-shadow: 0px 0px 0px 2px ${props.theme.error.primary};
      border-color: transparent;
    `}
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
