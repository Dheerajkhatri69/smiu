import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionSrt } from "@/lib/db";
import { TestScore } from "@/lib/model/testScore";

// Ensure MongoDB connection is established before handling requests
const connectToDatabase = async () => {
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(connectionSrt);
    }
};

export async function POST(request) {
    try {
        await connectToDatabase(); // Ensure connection

        // Parse the incoming request body
        const { cnic } = await request.json();

        // Check for missing CNIC in the request
        if (!cnic) {
            return NextResponse.json({ error: "CNIC is required" }, { status: 400 });
        }

        // Query the database for matching records
        const existingTestScore = await TestScore.findOne({ cnic });

        if (!existingTestScore) {
            return NextResponse.json({ exists: false });
        }

        // Return all data if a match is found
        return NextResponse.json({ exists: true, data: existingTestScore });
    } catch (error) {
        console.error("Error in POST request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}