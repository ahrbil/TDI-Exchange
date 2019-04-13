import { Prisma } from "./generated/prisma-client";
import { IS_PROD } from "./constants";

// db endpoint
const endpoint = IS_PROD
  ? process.env.PRISMA_ENDPOINT
  : process.env.PRISMA_ENDPOINT_DEV;

// db secret
const secret = IS_PROD
  ? process.env.PRISMA_SECRET
  : process.env.PRISMA_SECRET_DEV;

const getPrisma = () => {
  try {
    const db = new Prisma({
      endpoint,
      secret
    });
    return db;
  } catch (err) {
    // console.log("prisma err", err);
  }
};

const prisma = getPrisma();

export default prisma;
