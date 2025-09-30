import { connectDB } from "@/lib/mongodb";
import Appointments from "@/models/Appointments";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  try {
    const appointments = await Appointments.find().populate('customer')
    return NextResponse.json(appointments)
  } catch (err) {
    return NextResponse.json({message: "Failed to retrieve appointments", error: err})
  }
}
