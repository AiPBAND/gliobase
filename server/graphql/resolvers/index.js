
import { mergeResolvers } from "merge-graphql-schemas";

import Biomarker from "./Biomarker.js";
import Source from "./Source.js";
import Category from "./Category.js";

const resolvers = [Biomarker, Source, Category];

export default mergeResolvers(resolvers);