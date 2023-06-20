import mongoose from 'mongoose';
const { Schema } = mongoose;

const NewsSchema = new mongoose.Schema({
    title: {type: String, required: true, unique: true},
    desc: {type: String, required: true},
    lang: {type: String, required: true},
    category: {type: String, required: true},
    author: {type: String, required: true},
    image: {type: String},
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
}, {timestamps: true});


// mongoose.models = {}

// export default mongoose.model("News", NewsSchema)
export default mongoose.models.News || mongoose.model("News", NewsSchema);
