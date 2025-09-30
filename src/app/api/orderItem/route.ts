import { connectDB } from "@/lib/mongodb";
import OrderItem from "@/models/OrderItem";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  try {
    const orderItems = await OrderItem.find().populate({
      path: 'productVar',
      populate: {
        path: 'product'
      }
    })
    .populate('order')

    return NextResponse.json(orderItems)
  } catch (err) {
    return NextResponse.json({ message: "Error getting order items", error: err }, {status: 409})
  }
}