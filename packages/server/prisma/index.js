import { Prisma } from "../generated/prisma-client";

require("dotenv").config();

const prisma = new Prisma({
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: true,
});

export default prisma;
