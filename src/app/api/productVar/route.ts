import { connectDB } from "@/lib/mongodb";
import ProductVar from "@/models/ProductVar";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  const productVars = await ProductVar.find().populate('product')
  return NextResponse.json(
    productVars.map(variant => ({
      _id: variant._id.toString(),
      product: variant.product,
      size: variant.size,
      color: variant.color,
      quantity: variant.quantity
    }))
  )
}

export async function POST(req: Request) {
  await connectDB()
  try {
    const { product, size, color, quantity } = await req.json()
    if ( !product || !size || !color || quantity === undefined) {
      return NextResponse.json({message: "All input fields should be completed"})
    }

    const variant = await ProductVar.create({
      product,
      size,
      color,
      quantity
    })
    return NextResponse.json({message: "Created variant successfully", variant})
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({success: false, message: "This variant for this product already exists", error: error.message})
    }
    return NextResponse.json(
      { success: false, message: 'Failed to create product variant', error: error.message }, { status: 400 }
    )
  }
}