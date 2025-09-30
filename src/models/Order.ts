import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', require: true },
  orderDate: { type: Date, require: true, default: Date.now },
  address: { type: String, require: true },
  zipCode: { type: String, require: true },
  city: { type: String, require: true },
  province: { type: String, require: true },
  total: { type: Number, require: true },
  orderStatus: { 
    type: String, 
    require: true, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    default: "Pending"
  }
}, {
  timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

OrderSchema.virtual('orderItems',{
  ref: 'OrderItem',
  localField: '',
  foreignField: '',
  justOne: false
})

export default mongoose.models.Order || mongoose.model("Order", OrderSchema)