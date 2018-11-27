import { makeExecutableSchema } from "graphql-tools";
import { loadResolversFiles, loadSchemaFiles } from "@graphql-modules/sonar";
import { mergeGraphQLSchemas, mergeResolvers } from "@graphql-modules/epoxy";

const createSchema = () => {
  return makeExecutableSchema({
    typeDefs: mergeGraphQLSchemas(loadSchemaFiles(__dirname + "/modules/")),
    resolvers: mergeResolvers(loadResolversFiles(__dirname + "/modules/")),
  });
};

export default createSchema;