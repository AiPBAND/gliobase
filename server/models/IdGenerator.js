import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});
const IdGenerator = mongoose.model('IdGenerator', schema);

export default IdGenerator;