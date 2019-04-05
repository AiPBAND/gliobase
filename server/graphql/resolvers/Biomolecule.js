import Biomolecule from '../../models/Biomolecule';
import Category from '../../models/Category';
import Biomarker from '../../models/Biomarker';
import Fuse from 'fuse.js';

export default {
    Query: {
      	biomolecule: async (parent, {id}, context, info) => {
        	return await Biomolecule.findOne({_id: id}).exec();
      	},
      	biomolecules: async (parent, args, context, info) => {
			return await Biomolecule.find({}).exec();
		},
		biomoleculesBySource: async (parent, {source}, context, info) => {
			return await Biomolecule.find({ "sourceId" : source}).exec();
		},
		biomoleculesByCategory: async (parent, {category}, context, info) => {
			return await Biomolecule.find({ "categoryId" : category} ).exec();
		},
		biomoleculesSearch: async (parent, {text}, context, info) => {
			if(text){
				const list = await Biomolecule.find({}).exec();
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
					  "shortName"
				  ]
				  };
				  var fuse = new Fuse(list, options); // "list" is the item array
				  return fuse.search(text);
			}else{
				return await Biomolecule.find({}).exec();
			}
			
		}      
	},
	Biomolecule: {
		category: async (biomolecule) => {
			return await Category.findOne({_id: biomolecule.categoryId}).exec();
		},
		biomarkers: async (biomolecule) => {
			return await Biomarker.find({biomoleculeIds: biomolecule.id}).exec();
		},
		biomarkerCount: async (biomolecule) => {
			return await Biomarker.countDocuments({biomoleculeIds: biomolecule.id}).exec();
		}
	}
}