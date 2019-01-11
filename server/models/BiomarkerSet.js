import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	biomarkers: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Biomarker' }],
		required: true
	}
});

export default mongoose.model("BiomarkerSet", schema);