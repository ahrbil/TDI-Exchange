import { importSchema } from "graphql-import";
import { mergeTypes } from "merge-graphql-schemas";
import { readFileSync } from "fs";

const appSchema = importSchema(`${__dirname}/schemas/schema.graphql`);
const createInternshipSchema = readFileSync(
  `${__dirname}/schemas/createInternship.graphql`,
  { encoding: "utf8" }
);

const typeDefs = mergeTypes([appSchema, createInternshipSchema]);

export default typeDefs;
