import { connectionSrt } from "@/lib/db";
import { DegreeProgramInformation } from "@/lib/model/degreeProgramInformation";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await DegreeProgramInformation.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const degreeProgramInformation = new DegreeProgramInformation(payload)
    const result = await degreeProgramInformation.save();
    return NextResponse.json({ result, success: true })
}