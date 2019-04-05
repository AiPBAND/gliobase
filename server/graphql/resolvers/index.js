
import { mergeResolvers } from "merge-graphql-schemas";

import Biomolecule from "./Biomolecule.js";
import Biomarker from "./Biomarker.js";
import Source from "./Source.js";
import Category from "./Category.js";
import Evidence from "./Evidence.js";

const resolvers = [Biomolecule, Biomarker, Source, Category, Evidence];

export default mergeResolvers(resolvers);