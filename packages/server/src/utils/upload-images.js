import cloudinary from "cloudinary";
import { UserInputError } from "apollo-server-express";

import { FILE_TYPES } from "../constants";

const uploadImage = async (stream, type) => {
  if (FILE_TYPES.includes(type)) {
    return new Promise((resolve, reject) =>
      stream().pipe(
        cloudinary.v2.uploader.upload_stream(
          { folder: "assets" },
          (error, result) => {
            if (error) reject(new Error(error));
            if (result) resolve(result);
          }
        )
      )
    );
  }
  throw new UserInputError("invalid image type");
};

export default uploadImage;
