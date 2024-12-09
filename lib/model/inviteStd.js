import mongoose from "mongoose";

const inviteStdSchema = new mongoose.Schema({
    quizNo: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
});


// Create and export the inviteStd model
export const InviteStd = mongoose.models.InviteStd || mongoose.model("InviteStd", inviteStdSchema);
