import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionSrt } from "@/lib/db";
import { PersonalData } from "@/lib/model/personalData";

export async function POST(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionSrt);

        // Parse the incoming request body
        const { cnic, email } = await request.json();

        // Query the database for matching records
        const existingPersonalData = await PersonalData.findOne({
            $or: [{ cnic }, { email }]
        });

        if (!existingPersonalData) {
            return NextResponse.json({ exists: false });
        }

        // Return all data if a match is found
        return NextResponse.json({ exists: true, data: existingPersonalData });

    } catch (error) {
        console.log("Error in POST request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
