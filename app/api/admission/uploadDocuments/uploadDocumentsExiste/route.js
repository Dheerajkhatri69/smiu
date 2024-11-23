import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionSrt } from "@/lib/db";
import { UploadDocuments } from "@/lib/model/uploadDocuments";

export async function POST(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionSrt);

        // Parse the incoming request body
        const { cnic, email } = await request.json();

        // Query the database for matching records
        const existingUploadDocuments = await UploadDocuments.findOne({
            $or: [{ cnic }, { email }]
        });

        if (!existingUploadDocuments) {
            return NextResponse.json({ exists: false });
        }

        // Return all data if a match is found
        return NextResponse.json({ exists: true, data: existingUploadDocuments });

    } catch (error) {
        console.log("Error in POST request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
