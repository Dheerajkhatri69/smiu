import mongoose from "mongoose";

const studentSignupEmailSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
});

// Create and export the studentSignupEmail model
export const StudentSignupEmail = mongoose.models.StudentSignupEmail || mongoose.model("StudentSignupEmail", studentSignupEmailSchema);
