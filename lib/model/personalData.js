import mongoose from "mongoose";

const personalDataSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    mname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    cnic: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: String,
        required: true
    },
    domicile: {
        type: String,
        required: true
    },
    domicileDistrict: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    fathersName: {
        type: String,
        required: true
    },
    fathersOccupation: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    homephone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    postalAddress: {
        type: String,
        required: true
    },
    religion: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
});

// Create and export the PersonalData model
export const PersonalData = mongoose.models.PersonalData || mongoose.model("PersonalData", personalDataSchema);
