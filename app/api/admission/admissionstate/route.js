import { connectionSrt } from "@/lib/db";
import { AdmissionState } from "@/lib/model/admissionstate";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await AdmissionState.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const admissionState = new AdmissionState(payload)
    const result = await admissionState.save();
    return NextResponse.json({ result, success: true })
}