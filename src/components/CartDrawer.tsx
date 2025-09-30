"use client";

import { useCart } from "@/context/CartContext";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
    const { cart, removeFromCart, updateQuantity } = useCart();
    const [loading, setLoading] = useState(false);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const validateCartItems = (items: typeof cart) => {
        return items.every(
            (item) =>
                typeof item.name === "string" &&
                typeof item.price === "number" &&
                !isNaN(item.price) &&
                typeof item.quantity === "number" &&
                item.quantity > 0
        );
    };

    const handleCheckout = async () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        if (!validateCartItems(cart)) {
            alert("Some items in your cart are invalid. Please check your cart.");
            console.error("Invalid cart items:", cart);
            return;
        }

        try {
            setLoading(true);

            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cart }),
            });

            const data = await res.json();

            if (res.ok && data.url) {
                window.location.href = data.url; // Redirect to Stripe
            } else {
                alert(data.error || "Checkout failed");
                console.error("Stripe checkout error:", data);
            }
        } catch (err: unknown) {
            console.error("Checkout error:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-40"
                        onClick={onClose}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween" }}
                        className="fixed top-0 right-0 w-96 max-w-full h-full bg-white z-50 shadow-xl flex flex-col font-[Outfit]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h2 className="text-lg font-semibold">Your Cart</h2>
                            <button onClick={onClose}>
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {cart.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty.</p>
                            ) : (
                                cart.map((item) => (
                                    <div key={item._id} className="flex items-center justify-between border-b pb-4">
                                        {/* Product Image + Info */}
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-16 h-16 rounded overflow-hidden border">
                                                <Image
                                                    src={item.imageUrl || "/placeholder.png"}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                                className="p-1 border rounded hover:bg-gray-100"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="px-2">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                className="p-1 border rounded hover:bg-gray-100"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Remove */}
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="text-red-500 text-xs ml-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t">
                            <div className="flex justify-between mb-4">
                                <span className="font-semibold">Total</span>
                                <span className="font-semibold">${total.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={loading || cart.length === 0}
                                className="w-full bg-black text-white text-center py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
                            >
                                {loading ? "Redirecting..." : "Checkout"}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
