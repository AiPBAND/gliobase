import mongoose from 'mongoose';
import IdGenerator from './IdGenerator';

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

schema.pre('save', function(next) {
	const doc = this
	IdGenerator.findByIdAndUpdate({_id: "BiomarkerSet"}, {$inc: { seq: 1} }, (error, counter) => {
		if(error) return next(error);
		const paddedHex = counter.seq.toString(16).padStart(6, "0")
		doc._id = "S"+paddedHex
		next();
    });
});

schema.index({
	"biomarkerIds": "text"
})

export default mongoose.model("BiomarkerSet", schema);