
import { makeExecutableSchema} from "graphql-tools";
import {importSchema} from 'graphql-import';
//import typeDefs from "./types";
import resolvers from "./resolvers";

const typeDefs = importSchema('server/graphql/types/Query.graphql')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

export default schema
