import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import { Formik, Field, Form } from "formik";
import { navigate } from "@reach/router";

import TagPicker from "../components/tag-picker";
import Button from "../components/button";
import { CREATE_INTERNSHIP, INTERNSHIPS_FEED } from "../queries";
import InputFiled from "../components/input-field";
import {
  InputWrapper,
  InputLabel,
  PError
} from "../components/input-field/style";
import AvatarPicker from "../components/avatar-picker";
import validationSchema from "../components/form-validation-schema";
import { FILE_SIZE, FILE_TYPES } from "../constants";
import ScrollTop from "../components/scrollTop";

class PostInternship extends React.Component {
  state = {
    avatarPreviewUrl: ""
  };

  setAvatarPreviewUrl = file => {
    // https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Using_object_URLs_to_display_images
    if (file && file.size <= FILE_SIZE && FILE_TYPES.includes(file.type)) {
      const avatarPreviewUrl = (window.URL || window.webkitURL).createObjectURL(
        file
      );
      this.setState({ avatarPreviewUrl });
    } else {
      this.setState({ avatarPreviewUrl: "" });
    }
  };

  releaseAvatarPreviewUrl = () => {
    // release the object URL from memory
    (window.URL || window.webkitURL).revokeObjectURL(
      this.state.avatarPreviewUrl
    );
  };

  updateCache = (cache, { data: { createInternship } }) => {
    try {
      const data = cache.readQuery({
        query: INTERNSHIPS_FEED,
        variables: {
          first: 15,
          orderBy: "createdAt_DESC",
          skip: 0
        }
      });
      data.internshipsFeed.items.push(createInternship);
      cache.writeQuery({
        query: INTERNSHIPS_FEED,
        data
      });
    } catch (err) {
      //console.log(err);
    }
  };

  render() {
    const { avatarPreviewUrl } = this.state;
    return (
      <ScrollTop>
        <Mutation mutation={CREATE_INTERNSHIP} update={this.updateCache}>
          {(createInternship, { loading }) => (
            <div style={{ padding: "0px 16px" }}>
              <H1>Share an internship and help students grow.</H1>
              <Wrapper>
                <Formik
                  initialValues={{
                    title: "",
                    description: "",
                    location: "",
                    tags: [],
                    file: null
                  }}
                  onSubmit={async (
                    { tags, file, ...values },
                    { setSubmitting, setErrors, setFieldError }
                  ) => {
                    const namedTags = tags.map(tag => ({ name: tag.name }));
                    const imgFile = file;
                    const variables = { ...values, tags: namedTags, imgFile };
                    try {
                      await createInternship({
                        variables,
                        optimisticResponse: {
                          __typename: "Mutation",
                          createInternship: {
                            __typename: "Internship",
                            avatar: avatarPreviewUrl,
                            createdAt: Date.now(),
                            description: values.description,
                            id: `${Date.now()}-${values.title}`,
                            location: values.location,
                            tags,
                            title: values.title
                          }
                        }
                      });
                    } catch (error) {
                      if (
                        !!error.graphQLErrors[0].extensions.exception.errors
                      ) {
                        let errors = {};
                        // map over graphQLErrors and pass the errors to formik
                        error.graphQLErrors[0].extensions.exception.errors.forEach(
                          error => {
                            errors[error.path] = error.message;
                          }
                        );
                        setErrors(errors);
                      }

                      if (error.graphQLErrors[0].path === "createInternship") {
                        setFieldError("file", error.graphQLErrors[0].message);
                      }
                    }
                    setSubmitting(false);
                    await navigate("/internships");
                  }}
                  validateOnBlur={false}
                  validateOnChange={true}
                  validationSchema={validationSchema}
                  isInitialValid={false}
                >
                  {({
                    values,
                    setFieldValue,
                    validateField,
                    isSubmitting,
                    handleBlur,
                    isValidating,
                    errors
                  }) => (
                    <Form>
                      <Field
                        name="file"
                        title="Avatar"
                        accept={FILE_SIZE}
                        maxsize={FILE_TYPES}
                        component={AvatarPicker}
                        setFieldValue={setFieldValue}
                        onBlur={handleBlur}
                        setAvatarPreviewUrl={this.setAvatarPreviewUrl}
                        avatarPreviewUrl={avatarPreviewUrl}
                        releaseAvatarPreviewUrl={this.releaseAvatarPreviewUrl}
                        validateField={validateField}
                      />
                      <Field
                        name="title"
                        component={InputFiled}
                        placeholder="Internship title"
                      />
                      <Field
                        name="description"
                        component={InputFiled}
                        placeholder="Internship description"
                        textarea
                      />
                      <Field
                        name="location"
                        component={InputFiled}
                        placeholder="Internship location"
                        textarea
                      />
                      <InputWrapper>
                        <InputLabel htmlFor="tag">Tags</InputLabel>
                        <div>
                          <TagPicker
                            tags={values.tags}
                            onChange={setFieldValue}
                            hasError={!!errors.tags}
                          />
                        </div>
                        {errors.tags && <PError>{errors.tags}</PError>}
                      </InputWrapper>
                      <Button
                        type="submit"
                        disabled={isSubmitting || isValidating || loading}
                        loading={isSubmitting || loading}
                        style={{ alignSelf: "flex-start" }}
                      >
                        Publish
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Wrapper>
            </div>
          )}
        </Mutation>
      </ScrollTop>
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
