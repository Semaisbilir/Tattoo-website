import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import OrderItem from "@/models/OrderItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const order = await Order.findById(id)
    .populate('client')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'productVar',
        populate: {
          path: 'product'
        }
      }
    })

    if(!order) {
      return NextResponse.json({ message: "This order doesn't exist" }, { status: 404 })
    }
    return NextResponse.json(order)
}

export async function PUT(
req: Request,
{ params }: { params: Promise<{id: string}> }
){
  await connectDB()
  try {
    const { id } = await params
    const { orderStatus } = await req.json()
    const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled" ]
    if (!orderStatus || !statuses.includes(orderStatus)) {
      return NextResponse.json({message: "Missing order status"})
    }
    const order = await Order.findByIdAndUpdate(
      id, 
      {orderStatus: orderStatus},
      {new: true, runValidators: true}
    )
    if (!order) { 
      return NextResponse.json({ message: "This order doesn't exist" })
    }
    return NextResponse.json({message: "Order status updated" })
  } catch (error: any) {
    return NextResponse.json({ message: "Failed to update order status" })
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  try {
    const { id } = await params
    const session = await mongoose.startSession()
    session.startTransaction()

    const deletedOrderItems = await OrderItem.deleteMany({order: id}, {session})
    const deletedOrder = await Order.deleteOne({_id: id}, {session})

    if (!deletedOrder.deletedCount) { 
      await session.abortTransaction()
      session.endSession()
      return NextResponse.json({ message: "Problem tring to find order" })
    }
    await session.commitTransaction()
    session.endSession()
    return NextResponse.json({ message: `Order deleted successfully. Deleted items: ${deletedOrderItems}, Deleted order: ${deletedOrder}` })

  } catch (error) {
    return NextResponse.json({ message: "Error trying to delete this order.", error: error }, {status: 400})
  }
}