import mongoose from "mongoose";

const ProductVarSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: true },
  size: { type: String, require: true },
  color: { type: String, require: true },
  quantity: { type: Number, require: true, default: 0, min: 0 }
}, {timestamps: true})

ProductVarSchema.index({ product: 1, size: 1 }, { unique: true })

export default mongoose.models.ProductVar || mongoose.model("ProductVar", ProductVarSchema)