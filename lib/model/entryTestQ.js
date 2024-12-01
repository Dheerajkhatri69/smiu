import mongoose from "mongoose";

const entryTestQSchema = new mongoose.Schema({
    quizNo: {
        type: String,
        required: true,
    },
    id: {
        type: Number,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String], // An array of strings
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
});


// Create and export the EntryTestQ model
export const EntryTestQ = mongoose.models.EntryTestQ || mongoose.model("EntryTestQ", entryTestQSchema);
