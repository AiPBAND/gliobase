import BiomarkerSet from '../../models/BiomarkerSet';
import Biomarker from '../../models/Biomarker';
import Evidence from '../../models/Evidence';
import Fuse from 'fuse.js';

export default {
    Query: {
      	biomarkerSet: async (parent, {id}, context, info) => {
        	return await BiomarkerSet.findOne({_id: id}).exec();
      	},
      	biomarkerSets: async (parent, args, context, info) => {
			return await BiomarkerSet.find({}).exec();
		},
		biomarkerSetSearch: async (parent, {text}, context, info) => {
			if(text){
				const list = await BiomarkerSet.find({}).exec();
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
					  "biomarkerIds"
				  ]
				  };
				  var fuse = new Fuse(list, options); // "list" is the item array
				  console.log(fuse.search(text))
				  return fuse.search(text);
			}else{
				return await BiomarkerSet.find({}).exec();
			}
		}      
	},
	BiomarkerSet: {
		biomarkers: async (biomarkerSet) => {
			return await Biomarker.find({_id: {$in: biomarkerSet.biomarkerIds}}).exec();
		},
		evidences: async (biomarkerSet) => {
			return await Evidence.find({biomarkerSetId: biomarkerSet.id}).exec();
		}
	}
}