import { connectionSrt } from "@/lib/db";
import { Department } from "@/lib/model/department";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await Department.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const department = new Department(payload)
    const result = await department.save();
    return NextResponse.json({ result, success: true })
}