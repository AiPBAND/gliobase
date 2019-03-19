import Evidence from '../../models/Evidence';

export default {
    Query: {
      	evidence: async (parent, {id}, context, info) => {
        	return await Evidence.findOne({_id: id}).exec();
      	},
      	biomarkers: async (parent, args, context, info) => {
			return await Evidence.find({}).exec();
		}     
	}
}