import BiomarkerSet from '../../models/BiomarkerSet';
import Biomarker from '../../models/Biomarker';

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
				return await BiomarkerSet.find({ "$text" : {"$search": text}}, { score: { $meta: "textScore" } } )
					.sort( { score: { $meta: "textScore" } } ).exec();
			}else{
				return await BiomarkerSet.find({}).exec();
			}
		}      
	},
	BiomarkerSet: {
		biomarkers: async (biomarkerSet) => {
			return await Biomarker.find({_id: {$in: biomarkerSet.biomarkerIds}}).exec();
		}
	}
}