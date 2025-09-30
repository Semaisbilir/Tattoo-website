import { connectDB } from "@/lib/mongodb";
import OrderItem from "@/models/OrderItem";
import { NextResponse } from "next/server";

export async function GET(
  _: Request, 
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  try {
    const { id } = await params
    const orderItem = await OrderItem.findById(id).populate({
      path: 'productVar',
      populate: {
        path: 'product'
      }
    })
    .populate('order')

    if (!orderItem) {
      return NextResponse.json({ message: "This order item doesn't exist" }, { status: 404 })
    }
    return NextResponse.json({ message: "Correctly retrieved order item", item: orderItem })
  } catch (err: any) {
    return NextResponse.json({ message: "Error finding this order item", error: err })
  }
}

export async function DELETE (
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  try {
    const { id } = await params
    const deletedOrderItem = await OrderItem.deleteOne({_id: id })
    if (!deletedOrderItem) {
      return NextResponse.json({message: "Order item was not found"}, {status: 404})
    }
    return NextResponse.json({message: "Order item deleted successfully", deletedOrderItem})
  } catch(err) {
    return NextResponse.json({message: "Error trying to delete order item", error: err}, {status: 400})
  }
}