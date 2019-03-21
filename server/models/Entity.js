import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
		type: String,
		validate: {
			validator: function(v) {
			  return /E([A-Z0-9]){6}/.test(v);
			},
			message: props => `${props.value} is not a valid entity ID of the form E-XXXXXX.`
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

export default mongoose.model("Entity", schema);