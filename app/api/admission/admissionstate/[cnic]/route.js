import { connectionSrt } from "@/lib/db";
import { AdmissionState } from "@/lib/model/admissionstate";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to the database only if not already connected
async function connectDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionSrt);
    }
}

export async function PUT(request, { params }) {
    try {
        await connectDB();

        const admissionStateCNIC = params.cnic;
        const filter = { cnic: admissionStateCNIC };
        const payload = await request.json();

        const result = await AdmissionState.findOneAndUpdate(filter, payload, {
            new: true,            // Returns the updated document
            upsert: true           // Creates the document if it doesn't exist
        });

        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function GET(request, { params }) {
    try {
        await connectDB();

        const admissionStateCNIC = params.cnic;
        const filter = { cnic: admissionStateCNIC };

        const result = await AdmissionState.findOne(filter);  // Use findOne for custom filters

        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectDB();

        const admissionStateCNIC = params.cnic;
        const filter = { cnic: admissionStateCNIC };  // Assuming `cnic` is the identifier

        const result = await AdmissionState.deleteOne(filter);

        return NextResponse.json({ result, success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
