import { Prisma } from "./generated/prisma-client";

const getPrisma = () => {
  try {
    const db = new Prisma();
    return db;
  } catch (err) {
    // console.log("prisma err", err);
  }
};

const prisma = getPrisma();

export default prisma;
