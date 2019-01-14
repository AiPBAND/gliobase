import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
		type: String,
		validate: {
			validator: function(v) {
			  return /B-([A-Z0-9]){6}/.test(v);
			},
			message: props => `${props.value} is not a valid biomarker ID of the form B-XXXXXX.`
		  }
	},
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