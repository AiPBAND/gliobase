import Evidence from '../../models/Evidence';
import Biomarker from '../../models/Biomarker';
import Fuse from 'fuse.js';

export default {
    Query: {
      	evidence: async (parent, {id}, context, info) => {
        	return await Evidence.findOne({_id: id}).exec();
      	},
      	evidences: async (parent, args, context, info) => {
			return await Evidence.find({}).exec();
		},
		evidencesSearch: async (parent, {text}, context, info) => {
			if(text){
				const list = await Evidence.find({}).populate('biomarker').exec();
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
						"biomarkerId",  
					  	"biomarker.entityIds",
					  	"pmid",
						"sourceIds",
						"species",
						"stage",
						"whoclass",
						"region",
						"research.methods",
						"research.results",
						"research.conclusions",
						"clinical.relevance",
						"clinical.implication",
						"clinical.treatment"
				  	]
				};
				var fuse = new Fuse(list, options); // "list" is the item array
				return fuse.search(text);
			}else{
				return await Evidence.find({}).exec();
			}
			
		}     
	},
	Evidence: {
		biomarker: async (evidence) => {
			return await Biomarker.findOne({_id: evidence.biomarkerId}).exec();
		}
	}
}