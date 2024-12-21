import { connectionSrt } from "@/lib/db";
import { TestScore } from "@/lib/model/testScore";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await TestScore.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}
export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const testScore = new TestScore(payload)
    const result = await testScore.save();
    return NextResponse.json({ result, success: true })
}