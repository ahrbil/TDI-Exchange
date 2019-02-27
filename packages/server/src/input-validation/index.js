import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "too short for title")
    .required("*Title is required"),
  description: Yup.string()
    .min(8, "too short for description")
    .required("*Description is required"),
  location: Yup.string()
    .min(8, "too short for location address")
    .required("*Location is required"),
  tags: Yup.array()
    .max(10, "Only 10 tags are allowed")
    .required("Provide at least one tag")
});

export default validationSchema;
