
import { mergeResolvers } from "merge-graphql-schemas";

import Entity from "./Entity.js";
import Biomarker from "./Biomarker.js";
import Source from "./Source.js";
import Category from "./Category.js";
import Evidence from "./Evidence.js";

const resolvers = [Entity, Biomarker, Source, Category, Evidence];

export default mergeResolvers(resolvers);