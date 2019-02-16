export const CREATE_QUESTION = 1;
export const CREATE_ANSWER = 2;
export const CREATE_WORKING_ANSWER = 10;
export const FIRST_QUESTION = 10;
export const DELETE_CREATE_QUESTION = -1;
export const DELETE_CREATE_ANSWER = -2;
export const DELETE_CREATE_WORKING_ANSWER = -10;

export const FILE_TYPES = ["image/gif", "image/png", "image/jpg", "image/jpeg"];

export const PORT = process.env.PORT || 4000;
export const IS_PROD = process.env.NODE_ENV === "production";
export const HOST_URL = IS_PROD
  ? "https://tdi-exchange.now.sh"
  : "http://localhost:4000";
