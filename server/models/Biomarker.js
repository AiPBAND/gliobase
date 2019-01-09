import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Create the User Schema.
const BiomarkerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  abreviations: [String],
  description: String
});

export default mongoose.model("Biomarker", BiomarkerSchema);