import React from "react";
import { ErrorMessage } from "formik";

import {
  InputWrapper,
  InputLabel,
  TextArea,
  InputStyle,
  PError
} from "./style";

const InputFiled = ({
  field,
  form: { touched, errors },
  textarea,
  ...props
}) => (
  <InputWrapper>
    <InputLabel>{field.name}</InputLabel>
    {textarea ? (
      <TextArea
        as="textarea"
        {...field}
        {...props}
        hasError={!!(touched[field.name] && errors[field.name])}
      />
    ) : (
      <InputStyle
        {...field}
        {...props}
        autocomplete="off"
        hasError={!!(touched[field.name] && errors[field.name])}
      />
    )}
    <ErrorMessage name={field.name}>
      {msg => <PError>{msg}</PError>}
    </ErrorMessage>
  </InputWrapper>
);

export default InputFiled;
