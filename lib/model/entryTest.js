import mongoose from "mongoose";

const entryTestSchema = new mongoose.Schema({
    quizNo: {
        type: String,
        required: true,
    },
    quizTitle: {
        type: String,
        required: true,
    },
    quizDiscription: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    }
});


// Create and export the EntryTest model
export const EntryTest = mongoose.models.EntryTest || mongoose.model("EntryTest", entryTestSchema);
