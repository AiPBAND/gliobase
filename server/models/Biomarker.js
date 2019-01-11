import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	name: {
    	type: String,
    	required: true,
    	unique: true
  	},
  	abreviations: [String],
  	description: String
});

export default mongoose.model("Biomarker", schema);