import { connectionSrt } from "@/lib/db";
import { GuardiansData } from "@/lib/model/guardiansData";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await GuardiansData.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const guardiansData = new GuardiansData(payload)
    const result = await guardiansData.save();
    return NextResponse.json({ result, success: true })
}