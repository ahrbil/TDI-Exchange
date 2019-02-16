export const ITEMS_ON_PAGE = 15;
export const ANSWERS_ON_PAGE = ITEMS_ON_PAGE + 5;
export const FILE_TYPES = ["image/gif", "image/png", "image/jpg", "image/jpeg"];
export const FILE_SIZE = "8000000"; // 8mb
export const MEDIA_AT_A = "700px"; // first break point A
export const IS_PROD = process.env.NODE_ENV === "production";
export const GQL_URI = IS_PROD ? "/api" : "http://localhost:4000/api";
export const HOST_URL = IS_PROD
  ? "https://tdi-exchange.now.sh"
  : "http://localhost:4000";
