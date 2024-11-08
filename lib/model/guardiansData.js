import mongoose from "mongoose";

const guardiansDataSchema = new mongoose.Schema({
    address: {
        type: String,
        required: true
    },
    cnic:{
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    eCompleteAddress: {
        type: String,
        required: true
    },
    eMobile: {
        type: String,
        required: true
    },
    eRelationshipWithApllicant: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    emergencyName: {
        type: String,
        required: true
    },
    guardianName: {
        type: String,
        required: true
    },
    jobNature: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    occupation: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        required: true
    },
    relationshipWithApllicant: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
});

// Create and export the guardiansData model
export const GuardiansData = mongoose.models.GuardiansData || mongoose.model("GuardiansData", guardiansDataSchema);
