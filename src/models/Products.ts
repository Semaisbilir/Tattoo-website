import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    price: { type: Number, require: true },
    image: { type: String, require: true },
    category: { type: String, require: true },
});

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
