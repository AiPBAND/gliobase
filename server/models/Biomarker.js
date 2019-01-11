import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
    	type: String,
    	required: true,
    	unique: true
  	},
  	abreviations: [String],
	description: String,
	source: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Source',
		required: true
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true
	}    
});

export default mongoose.model("Biomarker", schema);