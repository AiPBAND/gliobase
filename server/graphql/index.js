import { makeExecutableSchema } from "graphql-tools";

import typeDefs from "./types";
import resolvers from "./resolvers";


const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});
console.log(schema)
export default schema
