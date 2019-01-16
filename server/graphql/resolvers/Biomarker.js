import Biomarker from '../../models/Biomarker';
import Category from '../../models/Category';
import Source from '../../models/Source';
import {ObjectId} from 'mongodb';

export default {
    Query: {
      	biomarker: async (parent, {id}, context, info) => {
        	return await Biomarker.findOne({_id: id}).exec();
      	},
      	biomarkers: async (parent, args, context, info) => {
			return await Biomarker.find({}).exec();
		},
		biomarkersBySource: async (parent, {source}, context, info) => {
			return await Biomarker.find({ "sourceId" : source}).exec();
		},
		biomarkersByCategory: async (parent, {category}, context, info) => {
			return await Biomarker.find({ "categoryId" : category} ).exec();
		},
		biomarkersSearch: async (parent, {text}, context, info) => {
			if(text){
				return await Biomarker.find({ "$text" : {"$search": text}}, { score: { $meta: "textScore" } } )
					.sort( { score: { $meta: "textScore" } } ).exec();
			}else{
				return await Biomarker.find({}).exec();
			}
			
		}      
	},
	Biomarker: {
		category: async (biomarker) => {
			return await Category.findOne({_id: biomarker.categoryId}).exec();
		},
		source: async (biomarker) => {
			return await Source.findOne({_id: biomarker.sourceId}).exec();
		}
	}
}