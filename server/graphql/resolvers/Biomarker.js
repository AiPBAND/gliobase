import Biomarker from '../../models/Biomarker';
import Entity from '../../models/Entity';
import Evidence from '../../models/Evidence';
import Fuse from 'fuse.js';

export default {
    Query: {
      	biomarker: async (parent, {id}, context, info) => {
        	return await Biomarker.findOne({_id: id}).exec();
      	},
      	biomarkers: async (parent, args, context, info) => {
			return await Biomarker.find({}).exec();
		},
		biomarkerSearch: async (parent, {text}, context, info) => {
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
					  "entityIds"
				  ]
				  };
				  var fuse = new Fuse(list, options); // "list" is the item array
				  return fuse.search(text);
			}else{
				return await Biomarker.find({}).exec();
			}
		}      
	},
	Biomarker: {
		entities: async (biomarker) => {
			return await Entity.find({_id: {$in: biomarker.entityIds}}).exec();
		},
		evidences: async (biomarker) => {
			return await Evidence.find({biomarkerId: biomarker.id}).exec();
		}
	}
}