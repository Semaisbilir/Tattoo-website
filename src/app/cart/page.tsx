"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();

    const handleCheckout = async () => {
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ items: cart }),
            });
            const data = await res.json();
            if (data.url) window.location.href = data.url;
            else alert("Checkout failed");
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        }
    };

    if (cart.length === 0)
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
                <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
                <Link href="/shop" className="text-blue-600 hover:underline">
                    Go to shop
                </Link>
            </div>
        );

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

            <div className="space-y-6">
                {cart.map((item) => (
                    <div key={item._id} className="flex items-center gap-6 border-b pb-4">
                        <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded" />
                        <div className="flex-1">
                            <h2 className="font-semibold">{item.name}</h2>
                            <p className="text-gray-600">${item.price.toFixed(2)}</p>
                            <div className="flex items-center mt-2 gap-2">
                                <button
                                    className="px-2 py-1 border rounded"
                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="px-2 py-1 border rounded"
                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                            <button className="text-red-500 text-sm mt-2" onClick={() => removeFromCart(item._id)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 flex justify-between items-center">
                <button onClick={clearCart} className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded">
                    Clear Cart
                </button>
                <div className="text-right">
                    <p className="text-lg">
                        Items: <strong>{cartCount}</strong>
                    </p>
                    <p className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</p>
                    <button
                        onClick={handleCheckout}
                        className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useCart } from "@/context/CartContext";

// export default function CartPage() {
//     const { cart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal } = useCart();

//     const handleCheckout = async () => {
//         try {
//             const res = await fetch("/api/checkout", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ items: cart }),
//             });
//             const data = await res.json();
//             if (data.url) window.location.href = data.url;
//             else alert("Checkout failed");
//         } catch (err) {
//             console.error(err);
//             alert("Something went wrong");
//         }
//     };

//     if (cart.length === 0)
//         return (
//             <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
//                 <h2 className="text-2xl font-bold mb-4">Your cart is empty 🛒</h2>
//                 <Link href="/shop" className="text-blue-600 hover:underline">
//                     Go to shop
//                 </Link>
//             </div>
//         );

//     return (
//         <div className="max-w-4xl mx-auto px-6 py-10">
//             <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

//             <div className="space-y-6">
//                 {cart.map((item) => (
//                     <div key={item._id} className="flex items-center gap-6 border-b pb-4">
//                         <Image src={item.imageUrl} alt={item.name} width={80} height={80} className="rounded" />
//                         <div className="flex-1">
//                             <h2 className="font-semibold">{item.name}</h2>
//                             <p className="text-gray-600">${item.price.toFixed(2)}</p>

//                             {/* Show special order info if exists */}
//                             {item.specialOrderType && item.specialOrderDetails && (
//                                 <div className="text-sm text-gray-500 mt-1">
//                                     <p>Type: {item.specialOrderType === "deliver" ? "Delivery" : "Pickup"}</p>
//                                     <p>Name: {item.specialOrderDetails.name}</p>
//                                     <p>Phone: {item.specialOrderDetails.phone}</p>
//                                     {item.specialOrderType === "deliver" && item.specialOrderDetails.address && (
//                                         <p>Address: {item.specialOrderDetails.address}</p>
//                                     )}
//                                 </div>
//                             )}

//                             <div className="flex items-center mt-2 gap-2">
//                                 <button
//                                     className="px-2 py-1 border rounded"
//                                     onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
//                                 >
//                                     -
//                                 </button>
//                                 <span>{item.quantity}</span>
//                                 <button
//                                     className="px-2 py-1 border rounded"
//                                     onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                                 >
//                                     +
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="text-right">
//                             <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
//                             <button className="text-red-500 text-sm mt-2" onClick={() => removeFromCart(item._id)}>
//                                 Remove
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div className="mt-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//                 <button onClick={clearCart} className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded">
//                     Clear Cart
//                 </button>
//                 <div className="text-right w-full md:w-auto">
//                     <p className="text-lg">
//                         Items: <strong>{cartCount}</strong>
//                     </p>
//                     <p className="text-xl font-bold">Total: ${cartTotal.toFixed(2)}</p>
//                     <button
//                         onClick={handleCheckout}
//                         className="w-full md:w-auto bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition mt-2 md:mt-0"
//                     >
//                         Checkout
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Product } from "@/types/Product";
// import { MailIcon } from "lucide-react";
// import { useCart } from "@/context/CartContext";

// export default function ProductCard({ product }: { product: Product }) {
//     const { addToCart } = useCart();
//     const [selectedSize, setSelectedSize] = useState<string>("Medium");

//     const defaultColors = ["black", "grey", "white"];
//     const colorsToShow = product.colors && product.colors.length > 0 ? product.colors : defaultColors;

//     const [selectedColor, setSelectedColor] = useState<string>(colorsToShow[0]);
//     const [quantity] = useState(1);

//     // Modal state
//     const [modalOpen, setModalOpen] = useState(false);
//     const [modalType, setModalType] = useState<"deliver" | "pickup" | null>(null);

//     // Customer info
//     const [customerName, setCustomerName] = useState("");
//     const [customerPhone, setCustomerPhone] = useState("");
//     const [customerAddress, setCustomerAddress] = useState("");

//     const isSoldOut = product.stock <= 0;
//     const isSpecialOrder = selectedSize === "Special Order";

//     const handleAddToCart = () => {
//         addToCart({
//             _id: product._id + selectedSize + selectedColor,
//             name: product.name + " - " + selectedSize + (selectedColor ? ` (${selectedColor})` : ""),
//             price: product.price,
//             imageUrl: product.imageUrl,
//             quantity,
//         });
//     };

//     const handleNotifyMe = () => {
//         const email = prompt("Enter your email to get notified:");
//         if (email) {
//             window.open(
//                 `mailto:tabuatattoo@gmail.com?subject=Notify Me&body=Please notify me when ${product.name} is back in stock. My email: ${email}`
//             );
//         }
//     };

//     const handleModalSubmit = () => {
//         if (!customerName || !customerPhone || (modalType === "deliver" && !customerAddress)) {
//             alert("Please fill all required fields!");
//             return;
//         }

//         addToCart({
//             _id: product._id + selectedSize + selectedColor + "-" + modalType,
//             name: `${product.name} - ${selectedSize} (${selectedColor}) [${modalType === "deliver" ? "Deliver to Me" : "Pickup in Store"}]`,
//             price: product.price,
//             imageUrl: product.imageUrl,
//             quantity,
//             specialOrderType: modalType!,
//             specialOrderDetails: {
//                 name: customerName,
//                 phone: customerPhone,
//                 address: modalType === "deliver" ? customerAddress : undefined,
//             },
//         });

//         // Reset modal state
//         setModalOpen(false);
//         setModalType(null);
//         setCustomerName("");
//         setCustomerPhone("");
//         setCustomerAddress("");
//         alert(`Added to cart for ${modalType === "deliver" ? "delivery" : "pickup"}!`);
//     };

//     return (
//         <div className="relative border p-3 rounded-lg shadow-sm group flex flex-col h-full">
//             {/* Product Image */}
//             <div className="relative aspect-square bg-gray-100 overflow-hidden rounded-md">
//                 <Image
//                     src={product.imageUrl}
//                     alt={product.name}
//                     fill
//                     className={`object-cover transition duration-300 group-hover:scale-105 ${isSoldOut ? "opacity-50 grayscale" : ""}`}
//                 />
//                 {isSoldOut && (
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs sm:text-sm uppercase">
//                         Sold Out
//                     </div>
//                 )}
//             </div>

//             <div className="flex flex-col mt-3 gap-1">
//                 <div className="text-lg sm:text-xl font-bold h-6 overflow-hidden">{product.name}</div>
//                 <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 h-12 overflow-hidden">
//                     {product.description}
//                 </div>
//                 <div className="text-lg sm:text-2xl font-bold bg-[#000000] dark:bg-[#e9e9e9] text-white dark:text-[#0B0B0B] px-2 py-1 rounded h-8 flex items-center">
//                     ${product.price.toFixed(2)}
//                 </div>
//             </div>

//             {/* Sizes */}
//             <div className="mt-2 text-xs sm:text-sm flex flex-wrap gap-2">
//                 {["Medium", "Large", "XL", "Special Order"].map((size) => (
//                     <button
//                         key={size}
//                         type="button"
//                         aria-pressed={selectedSize === size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`px-2 py-1 border rounded ${
//                             selectedSize === size ? "bg-black text-white border-black" : "text-gray-600 border-gray-300"
//                         }`}
//                     >
//                         {size}
//                     </button>
//                 ))}
//             </div>

//             {/* Colors */}
//             <div className="mt-2 flex gap-2">
//                 {colorsToShow.map((color) => (
//                     <button
//                         key={color}
//                         className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 ${selectedColor === color ? "border-black" : "border-gray-300"}`}
//                         style={{ backgroundColor: color }}
//                         title={color}
//                         onClick={() => setSelectedColor(color)}
//                     />
//                 ))}
//             </div>

//             {/* Bottom actions */}
//             <div className="mt-auto flex flex-col gap-2">
//                 <a href={`/shop/${product._id}`} className="text-sm text-blue-500 hover:underline">
//                     View Product
//                 </a>

//                 {/* Special Order Buttons */}
//                 {isSpecialOrder && (
//                     <div className="flex flex-col gap-2 text-xs sm:text-sm">
//                         <button
//                             className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition"
//                             onClick={() => {
//                                 setModalType("deliver");
//                                 setModalOpen(true);
//                             }}
//                         >
//                             Deliver to Me
//                         </button>

//                         <button
//                             className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition"
//                             onClick={() => {
//                                 setModalType("pickup");
//                                 setModalOpen(true);
//                             }}
//                         >
//                             Pickup in Store
//                         </button>

//                         <button
//                             className="flex items-center gap-1 text-blue-600 underline mt-1 hover:text-blue-800 transition"
//                             onClick={handleNotifyMe}
//                         >
//                             <MailIcon className="w-4 h-4" /> Notify Me
//                         </button>
//                     </div>
//                 )}

//                 {/* Add to Cart */}
//                 {!isSoldOut && !isSpecialOrder && (
//                     <button
//                         onClick={handleAddToCart}
//                         className="w-full py-2 bg-[#000000] dark:bg-[#e9e9e9] text-white dark:text-[#0B0B0B] rounded-xl text-sm sm:text-base hover:opacity-90 transition"
//                     >
//                         Add to Cart
//                     </button>
//                 )}
//             </div>

//             {/* Dynamic Modal */}
//             {modalOpen && (
//                 <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//                     <div className="bg-white p-6 rounded shadow-lg w-80">
//                         <h2 className="font-bold text-lg mb-4">
//                             {modalType === "deliver" ? "Delivery Info" : "Pickup Info"}
//                         </h2>
//                         <input
//                             type="text"
//                             placeholder="Name"
//                             className="w-full mb-2 border px-2 py-1 rounded"
//                             value={customerName}
//                             onChange={(e) => setCustomerName(e.target.value)}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Phone"
//                             className="w-full mb-2 border px-2 py-1 rounded"
//                             value={customerPhone}
//                             onChange={(e) => setCustomerPhone(e.target.value)}
//                         />
//                         {modalType === "deliver" && (
//                             <input
//                                 type="text"
//                                 placeholder="Address"
//                                 className="w-full mb-2 border px-2 py-1 rounded"
//                                 value={customerAddress}
//                                 onChange={(e) => setCustomerAddress(e.target.value)}
//                             />
//                         )}
//                         <div className="flex justify-end gap-2 mt-2">
//                             <button className="px-3 py-1 bg-gray-300 rounded" onClick={() => setModalOpen(false)}>
//                                 Cancel
//                             </button>
//                             <button className="px-3 py-1 bg-black text-white rounded" onClick={handleModalSubmit}>
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }
