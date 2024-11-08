import mongoose from "mongoose";

const degreeProgramInformationSchema = new mongoose.Schema({
    cnic: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    state: {
        type: Boolean,
        required: true,
    },
    choice01: {
        type: String,
        required: true,  // Enforcing that this choice is required
    },
    choice02: {
        type: String,
        required: true,  // Enforcing that this choice is required
    },
    choice03: {
        type: String,
        required: true,  // Enforcing that this choice is required
    },
    choice04: {
        type: String,
        required: true,  // Enforcing that this choice is required
    },
    choice05: {
        type: String,
        required: false,  // Default empty string, optional field
    },
    choice06: {
        type: String,
        required: false,  // Default empty string, optional field
    },
    choice07: {
        type: String,
        required: false,  // Default empty string, optional field
    },
    choice08: {
        type: String,
        required: false,  // Default empty string, optional field
    },
    degreeProgram: {
        type: String,
        required: true,
    },
    finance_scheme: {
        type: Boolean,
        required: true,
    },
    immediate_family_to_attend_university: {
        type: String,
        required: true,
    },
    transport_facility: {
        type: Boolean,
        required: true,
    },
});

// Create and export the degreeProgramInformation model
export const DegreeProgramInformation = mongoose.models.DegreeProgramInformation || mongoose.model("DegreeProgramInformation", degreeProgramInformationSchema);
