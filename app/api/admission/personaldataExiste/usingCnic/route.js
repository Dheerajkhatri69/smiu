import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionSrt } from "@/lib/db";
import { PersonalData } from "@/lib/model/personalData";

export async function POST(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionSrt);

        // Parse the incoming request body
        const { cnic } = await request.json();

        // Query the database for a matching record by cnic
        const existingPersonalData = await PersonalData.findOne({ cnic });

        if (!existingPersonalData) {
            return NextResponse.json({ exists: false });
        }

        // Return the data if a match is found
        return NextResponse.json({ exists: true, data: existingPersonalData });

    } catch (error) {
        console.log("Error in POST request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionSrt);

        // Parse the incoming request body
        const { cnic } = await request.json();

        if (!cnic) {
            return NextResponse.json(
                { error: "CNIC is required" },
                { status: 400 }
            );
        }

        // Find and delete the record by cnic
        const deletedRecord = await PersonalData.findOneAndDelete({ cnic });

        if (!deletedRecord) {
            return NextResponse.json(
                { success: false, message: "Record not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Record deleted successfully",
        });
    } catch (error) {
        console.log("Error in DELETE request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}