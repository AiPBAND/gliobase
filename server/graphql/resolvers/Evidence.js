import Evidence from '../../models/Evidence';
import BiomarkerSet from '../../models/BiomarkerSet';

export default {
    Query: {
      	evidence: async (parent, {id}, context, info) => {
        	return await Evidence.findOne({_id: id}).exec();
      	},
      	evidences: async (parent, args, context, info) => {
			return await Evidence.find({}).exec();
		}     
	},
	Evidence: {
		biomarkerSet: async (evidence) => {
			return await BiomarkerSet.findOne({_id: evidence.biomarkerSetId}).exec();
		}
	}
}