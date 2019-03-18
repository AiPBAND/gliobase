import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
		type: String,
		validate: {
			validator: function(v) {
			  return /S([A-F0-9]){6}/.test(v);
			},
			message: props => `${props.value} is not a valid biomarker set ID of the form S-XXXXXX.`
		  }
	},
	biomarkerIds: {
		type: [{ type: String, ref: 'Biomarker' }],
		required: true
	}
});

schema.index({
	"biomarkerIds": "text"
})

export default mongoose.model("BiomarkerSet", schema);