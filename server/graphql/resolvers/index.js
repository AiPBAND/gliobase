
import { mergeResolvers } from "merge-graphql-schemas";

import Biomarker from "./Biomarker.js";
import BiomarkerSet from "./BiomarkerSet.js";
import Source from "./Source.js";
import Category from "./Category.js";
import Evidence from "./Evidence.js";

const resolvers = [Biomarker, BiomarkerSet, Source, Category, Evidence];

export default mergeResolvers(resolvers);