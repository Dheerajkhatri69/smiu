import mongoose from "mongoose";
import { Users } from "@/lib/model/user";
import { NextResponse } from "next/server";
import { connectionSrt } from "@/lib/db";

export async function POST(request) {
    try {
        // Connect to MongoDB
        await mongoose.connect(connectionSrt);

        // Parse the incoming request body
        const { cnic, id, email } = await request.json();

        // Query the database for matching records
        const existingUser = await Users.findOne({
            $or: [{ cnic }, { id }, { email }]
        }).select("cnic id email");

        if (!existingUser) {
            return NextResponse.json({ exists: false });
        }

        // Construct a detailed response based on the found fields
        const exists = {
            email: existingUser.email === email,
            cnic: existingUser.cnic === cnic,
            id: existingUser.id === id,
        };

        return NextResponse.json({ exists });

    } catch (error) {
        console.log("Error in POST request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
