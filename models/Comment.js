import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    Title: {
        type: String,
        required: "Title is required"
    },
    CreateAt: {
        type: Date,
        default: Date.now
    }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;