import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	_id: {
    	type: String
  	},
  	description: String
});

export default mongoose.model("Category", schema);