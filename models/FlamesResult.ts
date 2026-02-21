import mongoose from "mongoose";

const FlamesResultSchema = new mongoose.Schema({
    name1: {
        type: String,
        required: [true, "Please provide the first name."],
    },
    name2: {
        type: String,
        required: [true, "Please provide the second name."],
    },
    letter: {
        type: String,
        required: true,
    },
    meaning: {
        type: String,
        required: true,
    },
    totalRemaining: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.FlamesResult || mongoose.model("FlamesResult", FlamesResultSchema);
