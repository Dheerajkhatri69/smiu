import mongoose from "mongoose";

const programSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    sort: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});


// Create and export the Program model
export const Program = mongoose.models.Program || mongoose.model("Program", programSchema);
