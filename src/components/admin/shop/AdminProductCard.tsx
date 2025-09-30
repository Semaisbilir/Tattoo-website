'use client'

import { ProductType } from "@/app/actions/products.actions"
import { MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import Image from "next/image"

type Props = {
  product: ProductType
}

const AdminProductCard = ({ product }: Props) => {

  return (
    <div className="flex flex-col dark:bg-gray-50 bg-gray-900 items-center min-h-full rounded-md dark:shadow-xl place-content-between max-w-[350]">
      <div className="flex justify-center w-full">
        <Image 
        src={product.image} 
        alt={product.name} 
        width={100} 
        height={100}
        className="w-full rounded-t-md"/>
      </div>
      <div id="product-info" className="flex flex-col px-5 py-3">
        <h2 className="font-bold">{product.name}</h2>
        <div>{product.description}</div>
        <div>${(product.price).toFixed(2)}</div>
        <div>{product.category}</div>
      </div>
      <div id="buttons" className="flex gap-2 px-5 py-3">
        <button className="cursor-pointer py-2 px-4 bg-gray-700 dark:bg-gray-300 hover:bg-gray-300 dark:hover:bg-black hover:text-black dark:hover:text-white rounded-sm hover:scale-105 ease-in-out duration-150"><MdEdit /></button>
        <button className="cursor-pointer py-2 px-4 bg-gray-700 dark:bg-gray-300 hover:bg-red-700 dark:hover:bg-red-500 dark:hover:text-white rounded-sm hover:scale-105 ease-in-out duration-150"><FaTrash /></button>
      </div>
    </div>
  )
}

export default AdminProductCard