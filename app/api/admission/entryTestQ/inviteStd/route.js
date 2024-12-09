import { connectionSrt } from "@/lib/db";
import { InviteStd } from "@/lib/model/inviteStd";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// GET Request
export async function GET() {
    let data = [];
    let success = true;
    try {
        // Ensure the connection is established before querying
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(connectionSrt);  // Connect to DB if not connected
        }
        data = await InviteStd.find();  // Get the data from the collection
    } catch (error) {
        console.error("Error fetching data:", error);
        data = { result: "error", message: error.message };  // Provide more details in the error
        success = false;
    }
    return NextResponse.json({ result: data, success });
}

// POST Request
export async function POST(request) {
    let success = true;
    let result = {};
    try {
        const payload = await request.json();  // Get the payload from the request
        // Ensure the connection is established before saving
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(connectionSrt);  // Connect to DB if not connected
        }
        const inviteStd = new InviteStd(payload);  // Create a new instance of InviteStd model
        result = await inviteStd.save();  // Save the new data to the database
    } catch (error) {
        console.error("Error saving data:", error);
        result = { error: "Failed to save data", message: error.message };
        success = false;  // Mark success as false in case of an error
    }
    return NextResponse.json({ result, success });
}
