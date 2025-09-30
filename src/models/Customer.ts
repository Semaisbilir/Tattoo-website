import mongoose from 'mongoose'

const CustomerSchema = new mongoose.Schema({
  fullname: { type: String, require: true },
  email: { type: String, require: true, unique: true, lowercase: true },
  address: { type: String, require: true },
  phone: { type: String, require: true, trim: true }
}, {timestamps: true})

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)