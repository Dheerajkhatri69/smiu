// dbConnect.js
import mongoose from "mongoose";
import { connectionSrt } from "./db";

export async function dbConnect() {
    if (mongoose.connection.readyState === 1) return; // Already connected
    await mongoose.connect(connectionSrt);
}
