import mongoose from "mongoose";
import { connectionSrt } from "@/lib/db";
import { StudentSignupEmail } from "@/lib/model/studentSignupEmail";
import { NextResponse } from "next/server";

// Connect to MongoDB
async function connectToDB() {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(connectionSrt);
    }
}

export async function PUT(request, content) {
    try {
        const studentSignupEmailId = content.params.studentSignupEmailid;
        const payload = await request.json();

        await connectToDB();

        const result = await StudentSignupEmail.findOneAndUpdate(
            { _id: studentSignupEmailId },
            payload,
            { new: true } // Return the updated document
        );

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in PUT request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function GET(request, content) {
    try {
        const studentSignupEmailId = content.params.studentSignupEmailid;

        await connectToDB();

        const result = await StudentSignupEmail.findById(studentSignupEmailId);

        if (!result) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in GET request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(request, content) {
    try {
        const studentSignupEmailId = content.params.studentSignupEmailid;

        await connectToDB();

        const result = await StudentSignupEmail.deleteOne({ _id: studentSignupEmailId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ result, success: true });
    } catch (error) {
        console.error("Error in DELETE request:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
