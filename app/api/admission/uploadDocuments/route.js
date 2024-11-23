import { connectionSrt } from "@/lib/db";
import { UploadDocuments } from "@/lib/model/uploadDocuments";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    let data = [];
    let success = true
    try {
        await mongoose.connect(connectionSrt)
        data = await UploadDocuments.find();
    } catch (error) {
        data = { result: "error" }
        success = false
    }
    return NextResponse.json({ result: data, success })
}

export async function POST(request) {
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const uploadDocuments = new UploadDocuments(payload)
    const result = await uploadDocuments.save();
    return NextResponse.json({ result, success: true })
}