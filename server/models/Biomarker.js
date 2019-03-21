import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
		type: String,
		validate: {
			validator: function(v) {
			  return /B([A-F0-9]){6}/.test(v);
			},
			message: props => `${props.value} is not a valid biomarker set ID of the form B-XXXXXX.`
		  }
	},
	entityIds: {
		type: [{ type: String, ref: 'Entity' }],
		required: true
	}
});

schema.index({
	"entityIds": "text"
})

export default mongoose.model("Biomarker", schema);