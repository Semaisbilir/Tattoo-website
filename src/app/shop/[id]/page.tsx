"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types/Product";
import { getProducts } from "@/lib/products";
import { MailIcon } from "lucide-react";

export default function ProductPage() {
    const { id } = useParams<{ id: string }>();
    const { addToCart } = useCart();

    const [product, setProduct] = useState<Product | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("Medium");
    const [selectedColor, setSelectedColor] = useState("");

    // Special order modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"deliver" | "pickup" | null>(null);

    // Customer info
    const [customerName, setCustomerName] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");
    const [customerAddress, setCustomerAddress] = useState("");

    useEffect(() => {
        const defaultColors = ["black", "grey", "white"];
        const all = getProducts();
        const found = all.find((p) => p._id === id) || null;
        setProduct(found);

        if (found) {
            const colors = found.colors?.length ? found.colors : defaultColors;
            setSelectedColor(colors[0]);
        }
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Product not found.</p>
            </div>
        );
    }

    const isSoldOut = product.stock <= 0;
    const isSpecialOrder = selectedSize === "Special Order";
    const colorsToShow = product.colors?.length ? product.colors : ["black", "grey", "white"];

    const handleAddToCart = () => {
        addToCart({
            _id: product._id + selectedSize + selectedColor,
            name: `${product.name} - ${selectedSize}${selectedColor ? ` (${selectedColor})` : ""}`,
            price: product.price,
            imageUrl: product.imageUrl || "/placeholder.png",
            quantity,
            size: selectedSize,
        });
        alert("Added to cart!");
    };

    const handleModalSubmit = () => {
        if (!customerName || !customerPhone || (modalType === "deliver" && !customerAddress)) {
            alert("Please fill all required fields!");
            return;
        }

        addToCart({
            _id: product._id + selectedSize + selectedColor + "-" + modalType,
            name: `${product.name} - ${selectedSize} (${selectedColor}) [${modalType === "deliver" ? "Deliver to Me" : "Pickup in Store"}]`,
            price: product.price,
            imageUrl: product.imageUrl || "/placeholder.png",
            quantity,
            size: selectedSize,
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
        alert(`Added to cart for ${modalType === "deliver" ? "delivery" : "pickup"}!`);
    };

    const handleNotifyMe = () => {
        const email = prompt(`Enter your email to get notified when ${product.name} is back in stock:`);
        if (email) {
            window.open(
                `mailto:tabuatattoo@gmail.com?subject=Notify Me&body=Please notify me when ${product.name} is back in stock. My email: ${email}`
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Product Image */}
                <div className="relative w-full h-96">
                    <Image
                        src={product.imageUrl || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className={`object-cover rounded-lg ${isSoldOut ? "opacity-50 grayscale" : ""}`}
                    />
                    {isSoldOut && (
                        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-sm">
                            <p className="uppercase font-semibold">Sold Out</p>
                            <button
                                className="flex items-center gap-1 underline text-blue-400 mt-2"
                                onClick={handleNotifyMe}
                            >
                                <MailIcon className="w-4 h-4" /> Notify Me
                            </button>
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <p className="text-2xl font-semibold mb-6">${product.price.toFixed(2)}</p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mb-6">
                        <button
                            className="px-3 py-1 border rounded"
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        >
                            -
                        </button>
                        <span>{quantity}</span>
                        <button className="px-3 py-1 border rounded" onClick={() => setQuantity((q) => q + 1)}>
                            +
                        </button>
                    </div>

                    {/* Sizes */}
                    <div className="flex gap-2 mb-4">
                        {["Medium", "Large", "XL", "Special Order"].map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-3 py-1 border rounded ${
                                    selectedSize === size
                                        ? "bg-black text-white border-black"
                                        : "text-gray-600 border-gray-300"
                                }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    {/* Colors */}
                    <div className="flex gap-2 mb-4">
                        {colorsToShow.map((color) => (
                            <button
                                key={color}
                                className={`w-6 h-6 rounded-full border-2 ${
                                    selectedColor === color ? "border-black" : "border-gray-300"
                                }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </div>

                    {/* Special Order */}
                    {isSpecialOrder && !isSoldOut && (
                        <div className="flex flex-col gap-2 text-xs mb-4">
                            <button
                                className="bg-black text-white px-2 py-1 rounded"
                                onClick={() => {
                                    setModalType("deliver");
                                    setModalOpen(true);
                                }}
                            >
                                Deliver to Me
                            </button>

                            <button
                                className="bg-black text-white px-2 py-1 rounded"
                                onClick={() => {
                                    setModalType("pickup");
                                    setModalOpen(true);
                                }}
                            >
                                Pickup in Store
                            </button>

                            <button
                                className="flex items-center gap-1 text-blue-600 underline mt-1"
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
                            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 mt-auto"
                        >
                            Add to Cart
                        </button>
                    )}
                </div>
            </div>

            {/* Modal */}
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
