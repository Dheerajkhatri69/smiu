import { connectionSrt } from "@/lib/db";
import { Department } from "@/lib/model/department";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
    const departmentId = content.params.departmentid;
    const filter = {_id:departmentId}
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const result = await Department.findOneAndUpdate(filter, payload)
    return NextResponse.json({ result, success: true })
}

export async function GET(request, content) {
    const departmentId = content.params.departmentid;
    const filter = {_id:departmentId}
    await mongoose.connect(connectionSrt)
    const result = await Department.findById(filter)
    return NextResponse.json({ result, success: true })
}

export async function DELETE(request, content) {
    const departmentId = content.params.departmentid;
    const filter = {_id:departmentId}
    await mongoose.connect(connectionSrt)
    const result = await Department.deleteOne(filter)
    return NextResponse.json({ result, success: true })
}