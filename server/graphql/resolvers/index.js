
import { mergeResolvers } from "merge-graphql-schemas";

import Biomarker from "./Biomarker/";

const resolvers = [Biomarker];

export default mergeResolvers(resolvers);