'use client'

import { useEffect, useState } from "react"
import AdminProductCard from "./AdminProductCard"
import { getAllProducts, ProductType } from "@/app/actions/products.actions"
import { FaPlus } from "react-icons/fa";
import { MoonLoader } from "react-spinners"
import AddProductModal from "./AddProductModal";

const AdminShop = () => {

  const [ products, setProducts ] = useState<ProductType[]>([])
  const [ loading, setLoading ] = useState<boolean>(true)

  useEffect(() => {
    const fetchAllProducts = async () => {
      const data = await getAllProducts()
      setProducts(data)
      setLoading(false)
    }
    fetchAllProducts()
  }, [])

  if (loading) {
    return (
        <MoonLoader color="#ffd230"/>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mx-auto sm:max-w-[90%] md:max-w-[70%] gap-5">
      <button className="sm:hover:scale-102 hover:scale-110 cursor-pointer sm:bg-gray-900 sm:dark:bg-gray-50 sm:hover:bg-white/20 ease-in-out duration-150 sm:dark:hover:bg-gray-200 fixed sm:static right-10 bottom-40 sm:flex sm:flex-col sm:items-center sm:justify-center sm:outline-gray-700 sm:dark:outline-gray-300 sm:outline-dashed sm:rounded-sm sm:px-5 sm:py-3 sm:gap-3">
        <div className="rounded-full bg-green-700 dark:bg-green-500 dark:text-white p-2 text-3xl"><FaPlus /></div>
        <h2 className="hidden sm:block">ADD NEW PRODUCT</h2>
      </button>
      {products.map((product) => (
        <AdminProductCard key={product._id} product={product}/>
      ))}
      <AddProductModal/>
    </div>
  )
}

export default AdminShop