import mongoose from "mongoose";

const uploadDocumentsSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true
    },    
    email: {
        type: String,
        required: true,
        unique: true
    },
    imgCnic_FormB: {
        type: String,
        required: true
    },
    imgFeeVoucher: {
        type: String,
        required: true
    },
    imgHSC_Marksheet: {
        type: String,
        required: true
    },
    imgSSC_Marksheet: {
        type: String,
        required: true
    },
    state: {
        type: Boolean,
        required: true
    }
});

// Create and export the UploadDocuments model
export const UploadDocuments = mongoose.models.UploadDocuments || mongoose.model("UploadDocuments", uploadDocumentsSchema);
