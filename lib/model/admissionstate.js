import mongoose from "mongoose";

const admissionStateSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
        unique: true
    },
    personalData: {
        type: Boolean,
        default: false
    },
    guardiansData: {
        type: Boolean,
        default: false
    },
    degreeProgramInformation: {
        type: Boolean,
        default: false
    },
    academicData:{
        type: Boolean,
        default: false
    },
    finalStepUploadDocuments:{
        type: Boolean,
        default: false
    },
});

// Create and export the admissionState model
export const AdmissionState = mongoose.models.AdmissionState || mongoose.model("AdmissionState", admissionStateSchema);
