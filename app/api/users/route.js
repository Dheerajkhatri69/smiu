import { connectionSrt } from "@/lib/db";
import { Users } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await Users.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const user = new Users(payload)
    const result = await user.save();
    return NextResponse.json({ result, success: true })
}
