import { connectionSrt } from "@/lib/db";
import { Program } from "@/lib/model/program";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await Program.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const program = new Program(payload)
    const result = await program.save();
    return NextResponse.json({ result, success: true })
}