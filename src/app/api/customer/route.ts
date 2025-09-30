import { connectDB } from "@/lib/mongodb"
import Customer from "@/models/Customer"
import { NextResponse } from "next/server"

export async function GET() {
  await connectDB()
  const customers = await Customer.find()
  return NextResponse.json(
    customers.map(customer => ({
      _id: customer._id.toString(),
      fullname: customer.fullname,
      email: customer.email,
      address: customer.address,
      phone: customer.phone
    }))
  )
}

export async function POST(req: Request) {
  await connectDB()
  try {
    const { fullname, email, address, phone } = await req.json()
    if ( !fullname || !email || !address || !phone ) {
      return NextResponse.json({message: "All input fields should be completed."}, {status: 400})
    }
    const customer = await Customer.findOneAndUpdate({email: email}, 
      {fullname: fullname, address: address, phone: phone},
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
        runValidators: true
      }
    )
    return NextResponse.json({message: "Customer information correctly added", data: customer, success: true})
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({success: false, message: "This email is already in use", error: error.message})
    }
    return NextResponse.json(
      { success: false, message: 'Failed to add or update client information.', error: error.message }, { status: 400 }
    )
  }
}