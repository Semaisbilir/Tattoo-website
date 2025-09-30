import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  productVar: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductVar', require: true },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', require: true },
  quantity: { type: Number, require: true, min: 1 },
  price: { type: Number, require: true, min: 0 }
}, {timestamps: true})

export default mongoose.models.OrderItem || mongoose.model("OrderItem", OrderItemSchema)