import { connectDB } from "@/lib/mongodb";
import Customer from "@/models/Customer";
import Order from "@/models/Order";
import ProductVar from "@/models/ProductVar";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB()
  try {
    const orders = await Order.find().populate('customer')
    .populate({
      path: 'orderItems',
      populate: {
        path: 'productVar',
        populate: {
          path: 'product'
        }
      }
    })
    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ message: "error getting orders", error: error }, {status: 409})
  }
}

export async function POST(req: Request) {
  await connectDB()
  try {
    const { customerDetails, items } = await req.json()
    let customer
    if (customerDetails && customerDetails.email && customerDetails.name && customerDetails.address && customerDetails.phone) {
      customer = await Customer.findOneAndUpdate(
        { email: customerDetails.email },
        {
         name: customerDetails.name,
         address: customerDetails.address,
         phone: customerDetails.phone 
        },
        { upsert: true, new: true, setDefaultsOnInsert: true, runValidators: true }
      )
    } else {
      return NextResponse.json({message: "missing information details on order creation"}, {status: 400})
    }
    if (!customer) {
      return NextResponse.json({ message: "failed to create or find existing customer" }, { status: 404})
    }

    let totalAmount = 0
    let orderItems = []
    let stockUpdates = []

    if (items.length === 0) {
      return NextResponse.json({message: "orders must contain at least one item"})
    }

    for (const item of items) {
      const { productVarId, quantity } = item
      if (!productVarId || quantity === 0) {
        return NextResponse.json({message: "Invalid item information"})
      }
      const prodVariant = await ProductVar.findById(productVarId).populate('product')
      if (!prodVariant) NextResponse.json({message: "this product variant doesn't exist"}) 
      if (prodVariant.quantity < quantity) {
        const productName = prodVariant.product.name
        const variantSize = prodVariant.size
        return NextResponse.json({ message: "Not enough stock of this product" }, { status: 400 })
      }

      const itemPrice = prodVariant.product.price
      const itemSubtotal = itemPrice * quantity
      totalAmount += itemSubtotal
      orderItems.push({
        prodVariant: prodVariant._id,
        quantity: quantity,
        price: itemPrice
      })

      stockUpdates.push({
        id: prodVariant._id,
        newQuantity: prodVariant.quantity - quantity
      })
    }

    const newOrder = new Order({
      client: customer._id,
      orderDate: Date.now(),
      address: customerDetails.address,
      zipCode: customerDetails.zipCode,
      city: customerDetails.city,
      province: customerDetails.province,
      totalAmount: totalAmount,
      orderStatus: "Pending"
    })
    const savedOrder = await newOrder.save()

    for (const update of stockUpdates) {
      await ProductVar.findByIdAndUpdate(update.id, { $set: { quantity: update.newQuantity } })
    }

    return NextResponse.json({ message: "Order created successfully", savedOrder })

  } catch (error) {
    return NextResponse.json({ message: "There was an error creating the order."})
  }
}