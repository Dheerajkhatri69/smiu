import mongoose from "mongoose";

const academicDataSchema = new mongoose.Schema({
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

    // HSC/A-level fields
    hsc_alevel_board: {
        type: String,
        required: true,
    },
    hsc_alevel_degree: {
        type: String,
        required: true,
    },
    hsc_alevel_examType: {
        type: String,
        required: true,
    },
    hsc_alevel_grade: {
        type: String,
        required: true,
    },
    hsc_alevel_group: {
        type: String,
        required: true,
    },
    hsc_alevel_institution: {
        type: String,
        required: true,
    },
    hsc_alevel_optainedMarks: {
        type: Number,
        required: true,
    },
    hsc_alevel_passingYear: {
        type: Number,
        required: true,
    },
    hsc_alevel_percentage: {
        type: Number,
        required: true,
    },
    hsc_alevel_seatNo: {
        type: String,
        required: true,
    },
    hsc_alevel_startYear: {
        type: Number,
        required: true,
    },
    hsc_alevel_totalMarks: {
        type: Number,
        required: true,
    },

    // SSC/O-level fields
    ssc_olevel_board: {
        type: String,
        required: true,
    },
    ssc_olevel_degree: {
        type: String,
        required: true,
    },
    ssc_olevel_examType: {
        type: String,
        required: true,
    },
    ssc_olevel_grade: {
        type: String,
        required: true,
    },
    ssc_olevel_group: {
        type: String,
        required: true,
    },
    ssc_olevel_institution: {
        type: String,
        required: true,
    },
    ssc_olevel_optainedMarks: {
        type: Number,
        required: true,
    },
    ssc_olevel_passingYear: {
        type: Number,
        required: true,
    },
    ssc_olevel_percentage: {
        type: Number,
        required: true,
    },
    ssc_olevel_seatNo: {
        type: String,
        required: true,
    },
    ssc_olevel_startYear: {
        type: Number,
        required: true,
    },
    ssc_olevel_totalMarks: {
        type: Number,
        required: true,
    },
});

// Create and export the academicData model
export const AcademicData = mongoose.models.AcademicData || mongoose.model("AcademicData", academicDataSchema);
