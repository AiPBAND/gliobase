import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	biomarkerIds: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Biomarker' }],
		required: true
	}
});

export default mongoose.model("BiomarkerSet", schema);