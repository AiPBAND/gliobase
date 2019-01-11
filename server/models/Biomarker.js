import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
    	type: String,
    	required: true,
    	unique: true
  	},
  	abreviations: [String],
	description: String,
	sourceId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Source',
		required: true
	},
	categoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	}    
});

export default mongoose.model("Biomarker", schema);