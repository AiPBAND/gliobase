import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
		type: String,
		validate: {
			validator: function(v) {
			  return /K([A-F0-9]){6}/.test(v);
			},
			message: props => `${props.value} is not a valid biomarker set ID of the form K-XXXXXX.`
		  }
	},
	biomoleculeIds: {
		type: [{ type: String, ref: 'Biomolecule' }],
		required: true
	}
});

schema.index({
	"biomoleculeIds": "text"
})

export default mongoose.model("Biomarker", schema);