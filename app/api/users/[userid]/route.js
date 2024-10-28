import { connectionSrt } from "@/lib/db";
import { Users } from "@/lib/model/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(request, content) {
    const userId = content.params.userid;
    const filter = {_id:userId}
    const payload = await request.json()
    await mongoose.connect(connectionSrt)
    const result = await Users.findOneAndUpdate(filter, payload)
    return NextResponse.json({ result, success: true })
}

export async function GET(request, content) {
    const userId = content.params.userid;
    const filter = {_id:userId}
    await mongoose.connect(connectionSrt)
    const result = await Users.findById(filter)
    return NextResponse.json({ result, success: true })
}

export async function DELETE(request, content) {
    const userId = content.params.userid;
    const filter = {_id:userId}
    await mongoose.connect(connectionSrt)
    const result = await Users.deleteOne(filter)
    return NextResponse.json({ result, success: true })
}