import { connectionSrt } from "@/lib/db";
import { StudentSignupEmail } from "@/lib/model/studentSignupEmail";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await StudentSignupEmail.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const studentSignupEmail = new StudentSignupEmail(payload)
    const result = await studentSignupEmail.save();
    return NextResponse.json({ result, success: true })
}