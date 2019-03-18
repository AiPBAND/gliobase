import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
		type: String,
		validate: {
			validator: function(v) {
			  return /B([A-Z0-9]){6}/.test(v);
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
	categoryId: {
		type: String,
		ref: 'Category',
		required: true
	}    
});

schema.index({
	_id: "text",
	name: "text",
	abreviations: "text",
	description: "text"
})

export default mongoose.model("Biomarker", schema);