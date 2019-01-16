import Biomarker from '../../models/Biomarker';
import Category from '../../models/Category';
import Source from '../../models/Source';
import Fuse from 'fuse.js';

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
				const list = await Biomarker.find({}).exec();
				var options = {
					shouldSort: true,
					tokenize: true,
					findAllMatches: true,
					threshold: 0,
					location: 0,
					distance: 100,
					maxPatternLength: 32,
					minMatchCharLength: 1,
					keys: [
					  "id",
					  "name",
					  "abreviations",
					  "description"
				  ]
				  };
				  var fuse = new Fuse(list, options); // "list" is the item array
				  console.log(fuse.search(text))
				  return fuse.search(text);
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