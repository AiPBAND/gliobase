import Evidence from '../../models/Evidence';
import Biomarker from '../../models/Biomarker';

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
		biomarker: async (evidence) => {
			return await Biomarker.findOne({_id: evidence.biomarkerId}).exec();
		}
	}
}