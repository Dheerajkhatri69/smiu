import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionSrt } from "@/lib/db";
import { StudentSignupEmail } from "@/lib/model/studentSignupEmail";

export async function POST(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionSrt);

        // Parse the incoming request body
        const { cnic, email } = await request.json();

        // Query the database for matching records
        const existingStudentSignupEmail = await StudentSignupEmail.findOne({
            $or: [{ cnic }, { email }]
        }).select("cnic email");

        if (!existingStudentSignupEmail) {
            return NextResponse.json({ exists: false });
        }

        // Construct a detailed response based on the found fields
        const exists = {
            cnic: existingStudentSignupEmail.cnic === cnic,
            email: existingStudentSignupEmail.email === email,
        };

        return NextResponse.json({ exists });

    } catch (error) {
        console.log("Error in POST request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
