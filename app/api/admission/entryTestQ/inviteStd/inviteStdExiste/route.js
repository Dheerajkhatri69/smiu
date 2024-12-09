import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionSrt } from "@/lib/db";
import { InviteStd } from "@/lib/model/inviteStd";

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
    const existingInviteStd = await InviteStd.findOne({ cnic });

    if (!existingInviteStd) {
      return NextResponse.json({ exists: false });
    }

    // Return all data if a match is found
    return NextResponse.json({ exists: true, data: existingInviteStd });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await connectToDatabase(); // Ensure connection

    // Parse the incoming request body
    const { cnic } = await request.json();

    // Check for missing CNIC in the request
    if (!cnic) {
      return NextResponse.json(
        { error: "CNIC is required" },
        { status: 400 }
      );
    }

    // Find and delete the record by cnic
    const deletedRecord = await InviteStd.findOneAndDelete({ cnic });

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
    console.error("Error in DELETE request:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
