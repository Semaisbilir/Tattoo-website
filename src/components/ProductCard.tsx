"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/Product";
import { MailIcon } from "lucide-react";
import { useCart } from "@/context/CartContext"
import toast from "react-hot-toast";

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const [selectedSize, setSelectedSize] = useState<string>("Medium");

    const defaultColors = ["black", "grey", "white"];
    const colorsToShow = product.colors && product.colors.length > 0 ? product.colors : defaultColors;
    const [selectedColor, setSelectedColor] = useState<string>(colorsToShow[0]);

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"deliver" | "pickup" | null>(null);

    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    const isSoldOut = product.stock <= 0;
    const isSpecialOrder = selectedSize === "Special Order";

    const handleAddToCart = () => {
        const uniqueId = product._id + selectedSize + selectedColor + "-" + Date.now();
        addToCart({
            _id: uniqueId,
            name: product.name + " - " + selectedSize + (selectedColor ? ` (${selectedColor})` : ""),
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
        });
        toast.success("Added to cart!");
    };

    const handleModalSubmit = () => {
        if (!customerName || !customerPhone || (modalType === "deliver" && !customerAddress)) {
            toast.error("Please fill all required fields!");
            return;
        }

        const uniqueId = product._id + selectedSize + selectedColor + "-" + modalType + "-" + Date.now();
        addToCart({
            _id: uniqueId,
            name: `${product.name} - ${selectedSize} (${selectedColor}) [${
                modalType === "deliver" ? "Deliver to Me" : "Pickup in Store"
            }]`,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
            size: selectedSize,
            color: selectedColor,
            specialOrderType: modalType!,
            specialOrderDetails: {
                name: customerName,
                phone: customerPhone,
                address: modalType === "deliver" ? customerAddress : undefined,
            },
        });

        setModalOpen(false);
        setModalType(null);
        setCustomerName("");
        setCustomerPhone("");
        setCustomerAddress("");

        toast.success(`Added to cart for ${modalType === "deliver" ? "delivery" : "pickup"}!`);
    };

    const handleNotifyMe = () => {
        const email = prompt("Enter your email to get notified:");
        if (email) {
            toast.success(`We'll notify you at ${email} when the product is back in stock!`);
        }
    };

    return (
        <div className="bg-black text-white dark:bg-white dark:text-black relative border border-white dark:border-black p-3 rounded-lg shadow-sm group flex flex-col h-full">
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-md">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className={`object-cover transition duration-300 group-hover:scale-105 ${
                        isSoldOut ? "opacity-50 grayscale" : ""
                    }`}
                />
                {isSoldOut && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs sm:text-sm uppercase">
                        Sold Out
                    </div>
                )}
            </div>

            <div className="flex flex-col mt-3 gap-1">
                <div className="text-white dark:text-black bg-black dark:bg-white text-lg sm:text-xl font-bold h-6 overflow-hidden">{product.name}</div>
                <div className="text-sm sm:text-base text-gray-400 dark:text-gray-600 h-12 overflow-hidden">{product.description}</div>
                <div className="text-lg sm:text-2xl font-bold bg-black dark:bg-white text-white dark:text-black px-2 py-1 rounded h-8 flex items-center">
                    ${product.price.toFixed(2)}
                </div>
            </div>

            {/* Sizes */}
            <div className="mt-2 text-xs sm:text-sm flex flex-wrap gap-2">
                {["Medium", "Large", "XL", "Special Order"].map((size) => (
                    <button
                        key={size}
                        type="button"
                        aria-pressed={selectedSize === size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-2 py-1 border rounded ${
                            selectedSize === size ? "bg-white dark:bg-black text-black dark:text-white border-white dark:border-black" : "dark:text-gray-600 text-gray-300 border-gray-300"
                        }`}
                    >
                        {size}
                    </button>
                ))}
            </div>

            {/* Colors */}
            <div className="mt-2 flex gap-2">
                {colorsToShow.map((color) => (
                    <button
                        key={color}
                        className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${
                            selectedColor === color ? "border-white dark:border-black" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                        onClick={() => setSelectedColor(color)}
                    />
                ))}
            </div>

            {/* Bottom actions */}
            <div className="mt-auto flex flex-col gap-2">
                <a href={`/shop/${product._id}`} className="text-sm text-blue-500 hover:underline">
                    View Product
                </a>

                {/* Special Order Buttons */}
                {isSpecialOrder && (
                    <div className="flex flex-col gap-2 text-xs sm:text-sm">
                        <button
                            className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
                            onClick={() => {
                                setModalType("deliver");
                                setModalOpen(true);
                            }}
                        >
                            Deliver to Me
                        </button>

                        <button
                            className="bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-400 transition"
                            onClick={() => {
                                setModalType("pickup");
                                setModalOpen(true);
                            }}
                        >
                            Pickup in Store
                        </button>

                        <button
                            className="flex items-center gap-1 text-blue-600 underline mt-1 hover:text-blue-800 transition"
                            onClick={handleNotifyMe}
                        >
                            <MailIcon className="w-4 h-4" /> Notify Me
                        </button>
                    </div>
                )}

                {/* Add to Cart */}
                {!isSoldOut && !isSpecialOrder && (
                    <button
                        onClick={handleAddToCart}
                        className="cursor-pointer w-full py-2 bg-white dark:bg-black dark:text-white text-black rounded-xl text-sm sm:text-base hover:opacity-90 transition"
                    >
                        Add to Cart
                    </button>
                )}
            </div>

            {/* Special Order Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                        <h2 className="font-bold text-lg mb-4">
                            {modalType === "deliver" ? "Delivery Info" : "Pickup Info"}
                        </h2>
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full mb-2 border px-2 py-1 rounded"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            className="w-full mb-2 border px-2 py-1 rounded"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                        />
                        {modalType === "deliver" && (
                            <input
                                type="text"
                                placeholder="Address"
                                className="w-full mb-2 border px-2 py-1 rounded"
                                value={customerAddress}
                                onChange={(e) => setCustomerAddress(e.target.value)}
                            />
                        )}
                        <div className="flex justify-end gap-2 mt-2">
                            <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="px-3 py-1 bg-black text-white rounded" onClick={handleModalSubmit}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
