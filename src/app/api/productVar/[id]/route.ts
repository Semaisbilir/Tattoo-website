import { connectDB } from "@/lib/mongodb";
import ProductVar from "@/models/ProductVar";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params } : { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const variant = await ProductVar.findById(id)
  if (!variant) {
    return NextResponse.json({message: "This variant doesn't exist"}, {status: 404})
  }
  return NextResponse.json(variant)
}

export async function DELETE(
  _: Request,
  { params } : { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const variant = await ProductVar.findByIdAndDelete(id)
  if (!variant) {
    return NextResponse.json({message: "This variant doesn't exist"}, {status: 404})
  }
  return NextResponse.json({message: "Successfully deleted variant", variant})
}

// Update only quantity for the variant
export async function PUT(
  req: Request,
  { params } : { params: Promise<{id: string}> }
) {
  await connectDB()
  try {
    const { id } = await params
    const newQuantity: number = await req.json() 
    const variant = await ProductVar.findById(id)
    if (!variant) {
      return NextResponse.json({message: "This product variant doesn't exist"}, {status: 404})
    }
    variant.quantity = newQuantity
    await variant.save()
  } catch (error: any) {
    return NextResponse.json({ message: "There was an error trying to update product", error: error }, {status: 400}) 
  }
}