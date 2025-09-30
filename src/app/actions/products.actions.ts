"use server"
import { connectDB } from "@/lib/mongodb"
import Products from "@/models/Products"
import { revalidatePath } from "next/cache"

export interface ProductType { 
  _id: string
  name: string
  price: number
  description: string,
  image: string
  category: string
}

//GET ALL PRODUCTS
export async function getAllProducts() {
  try {
    await connectDB()

    const products = await Products.find()
    return products.map(prod => ({
      _id: prod._id.toString(),
      name: prod.name,
      price: prod.price,
      description: prod.description,
      image: prod.image,
      category: prod.category
    }))
  } catch (err) {
    console.error("Failed to get products: ", err)
    throw err
  }
}

// Get a single product
export async function getProductById(id: string) {
  try {
    await connectDB()

    const product = await Products.findById(id)
    if (!product) return null

    return {
      _id: product._id.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
      category: product.category 
    }
  } catch (err) {
    console.error("Failed to get product: ", err)
    throw err
  }
}

// Add product
export async function addProduct(formData: FormData){
  try {
    const name = formData.get("name") as string
    const price = parseFloat(formData.get("price") as string)
    const description = formData.get("description") as string
    const image = formData.get("image") as File
    const category = formData.get("category") as string

    if (!image || !image.size) {
      throw new Error("Image is required.")
    }

    await connectDB()
    const existing = await Products.exists({name})
    if (existing) {
      throw new Error("Product already exists.")
    }

    await Products.create({
      name,
      price,
      description,
      image,
      category
    })
    revalidatePath("/products")
  } catch(err) {
    console.error("Failed to add product: ", err)
    throw err
  }
}

// Delete Product
export async function deleteProductById(id: string) {
  await connectDB()
  await Products.findByIdAndDelete(id)
  revalidatePath("/products")
}

// Update Product
export async function updateProductById(id: string, update: Partial<ProductType>) {
  await connectDB()
  try {
    const updatedProduct = await Products.findByIdAndUpdate(id, update, {new: true})
    if (!updatedProduct) return null

    return {
      _id: updatedProduct._id.toString(),
      name: updatedProduct.name,
      price: updatedProduct.price,
      description: updatedProduct.description,
      image: updatedProduct.image,
      category: updatedProduct.category 
    }
  } catch(err) {
    console.error("Failed to update product: ", err)
    throw err
  }
}