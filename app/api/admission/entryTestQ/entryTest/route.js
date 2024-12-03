import { connectionSrt } from "@/lib/db";
import { EntryTest } from "@/lib/model/entryTest";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await EntryTest.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}
export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const entryTest = new EntryTest(payload)
    const result = await entryTest.save();
    return NextResponse.json({ result, success: true })
}