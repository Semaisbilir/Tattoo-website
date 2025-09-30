'use server'
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export interface OrderType {
  _id: string
  clientID: string
  orderDate: Date
  adress: string
  zipcode: string
  city: string
  province: string
  total: number
}

export interface OrderItemInput {
  productVarID: string
  quantity: number
} 

export interface ClientDetails {
  name: string
  email: string
  phone: string
  address: string
  zipcode: string
  city: string
  province: string
}

// GET ALL ORDERS
async function getAllOrders() {
  await connectDB()

  const orders = await Order.find()
  return orders.map(order => ({
    _id: order._id.toString(),
    clientId: order.clientID.toString(),
    orderDate: order.orderDate,
    address: order.address,
    zipcode: order.string,
    city: order.city,
    province: order.province,
    total: order.total
  }))
}

// Get single order
async function getOrderById(id: string) {
  await connectDB()

  const order = await Order.findById(id)
  if (!order) return null

  return {
    _id: order._id.toString(),
    clientId: order.clientID.toString(),
    orderDate: order.orderDate,
    address: order.address,
    zipcode: order.zipcode,
    city: order.city,
    province: order.province,
    total: order.total
  }
}

// Create order 
async function createOrder(client: ClientDetails, formData: FormData) {
  try {
    const address = formData.get("address") as string
    const zipcode = formData.get("zipcode") as string
    const city = formData.get("city") as string
    const province = formData.get("province") as string

    await connectDB()
    await Order.create({
      client,
      orderDate: Date.now,
      address,
      zipcode,
      city,
      province,

    })

  } catch (err) {

  }
}

async function deleteOrderById(id: string) {
  await connectDB()
  await Order.findByIdAndDelete(id)
}

export default {
  getAllOrders,
  getOrderById,
  deleteOrderById,
  createOrder
}