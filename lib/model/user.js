import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    cnic: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    accounttype: {
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

// Create and export the Users model
export const Users = mongoose.models.User || mongoose.model("User", usersSchema);
