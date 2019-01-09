import { mergeTypes } from "merge-graphql-schemas";

import Biomarker from "./Biomarker/";

const typeDefs = [Biomarker];

export default mergeTypes(typeDefs, { all: true });