import { connectionSrt } from "@/lib/db";
import { EntryTestQ } from "@/lib/model/entryTestQ";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await EntryTestQ.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}
export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const entryTestQ = new EntryTestQ(payload)
    const result = await entryTestQ.save();
    return NextResponse.json({ result, success: true })
}