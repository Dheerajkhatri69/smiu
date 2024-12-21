import mongoose from "mongoose";

const testScoreSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
    },
    score: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    }
});

// Create and export the testScore model
export const TestScore = mongoose.models.TestScore || mongoose.model("TestScore", testScoreSchema);
