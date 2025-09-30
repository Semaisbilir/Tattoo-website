import { connectDB } from "@/lib/mongodb";
import Products from "@/models/Products";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  const products = await Products.find()
  return NextResponse.json(
    products.map(product => ({
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category
    }))
  )
}

export async function POST(req: Request) {
  await connectDB()
  try {
    const { name, price, description, image, category } = await req.json()
    if ( !name || !price || !description || !image || !category ) {
      return NextResponse.json({message: "All input fields should be completed."}, {status: 400})
    }

    const product = await Products.create({
      name,
      price,
      description,
      image,
      category
    })
    return NextResponse.json({message: "Created Product successfully", product})
  } catch (error: any) {
      if (error.code === 11000) {
        return NextResponse.json({success: false, message: "A product with the same name already exists", error: error.message})
      }
      return NextResponse.json(
        { success: false, message: 'Failed to create product', error: error.message }, { status: 400 }
      )
    }
}
