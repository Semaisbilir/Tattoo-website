import { ProductType } from "@/app/actions/products.actions";
import { connectDB } from "@/lib/mongodb";
import Products from "@/models/Products";
import { NextResponse } from "next/server";

export async function GET(
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const product = await Products.findById(id)
  if (!product) {
    return NextResponse.json({message: "This product does not exist"}, {status: 404})
  }
  return NextResponse.json(product)
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  const { id } = await params
  const product = await Products.findByIdAndDelete(id)
  if (!product) {
    return NextResponse.json({message: "This product does not exist"}, {status: 404})
  }
  return NextResponse.json({message: "Successfully deleted product:", product})
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{id: string}> }
) {
  await connectDB()
  try {
    const { id } = await params
    const { name, price, description, image, category } = await req.json()

    const updatedProduct: Partial<ProductType> = {
      name, price, description, image, category
    }
    const product = await Products.findByIdAndUpdate(id, updatedProduct, { new: true, runValidators: true})
    if (!product) return NextResponse.json({ message: "Product not found" }, {status: 404})
    
    return NextResponse.json({message: "Succesfully updated product", product})
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ message: 'A product with this name already exists', error: error.message }, { status: 409 })
    }
    return NextResponse.json({ message: "There was an error trying to update product", error: error }, {status: 400})
  }
}