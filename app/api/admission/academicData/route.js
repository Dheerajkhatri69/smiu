import { connectionSrt } from "@/lib/db";
import { AcademicData } from "@/lib/model/academicData";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await AcademicData.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const academicData = new AcademicData(payload)
    const result = await academicData.save();
    return NextResponse.json({ result, success: true })
}